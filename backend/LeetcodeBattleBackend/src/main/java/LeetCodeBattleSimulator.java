


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.http.HttpServlet;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/runCode")
public class LeetCodeBattleSimulator extends HttpServlet {
		private static final Object lock = new Object();
		private static CountDownLatch latch = new CountDownLatch(2);
		

		public boolean first = false;
	
        public String jsonFilePath; // THIS IS WHERE ISSUES LIE!!! Once u figure out the jsonFilePath or how you want to obtain the file, hopefully this works
        int index;
        // User's code to be tested
        public String userCode;
        
        @Override
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        	   response.addHeader("Access-Control-Allow-Origin", "*");
               response.setContentType("text/plain");
               this.index = Integer.parseInt(request.getParameter("number"));
               this.jsonFilePath = getServletContext().getRealPath("WEB-INF/lib/tests.json"); 
              
              

              
        }
        
        
        
        @Override
        protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        	response.addHeader("Access-Control-Allow-Origin", "*");
            response.setContentType("text/plain");

            int n = -100;
            
            ServletContext servletContext = getServletContext();
            
            // Retrieve prevRes and currentRes from ServletContext
            int prevRes = servletContext.getAttribute("prevRes") != null ? (int) servletContext.getAttribute("prevRes") : 0;
            int currentRes = servletContext.getAttribute("currentRes") != null ? (int) servletContext.getAttribute("currentRes") : 0;
            String email = request.getParameter("email");
            System.out.println("email" + email);
           
            
            try {
                latch.countDown();
                if (latch.getCount() > 0 ) {
                	n = runTests(this.jsonFilePath, request.getParameter("code"));
                	prevRes = n;
                    servletContext.setAttribute("prevRes", prevRes);
                	
                }
               
                
                
                else {
                	PrintWriter writer = response.getWriter();
                	currentRes = runTests(this.jsonFilePath, request.getParameter("code"));
                	
                	if (prevRes > currentRes) {
                		currentRes = 0 - currentRes;
                		update(email, false);
                	}
                	else {
                		update(email, true);
                	}
                	
                	writer.println(currentRes);
                    writer.close();
                    servletContext.setAttribute("currentRes", currentRes);
                }
                
                // Decrement latch
                latch.await(); // Wait until latch count is 0
                
                
                synchronized (lock) {
                    // Send response to the request
                    PrintWriter writer = response.getWriter();
                    
                    
                    if (n != -100) {
                    	if (prevRes < currentRes) {
                    		prevRes = 0 - prevRes;
                    		update(email, false);
                    	}
                    	else {
                    		update(email, true);
                    	}
                    	writer.println(prevRes);
                        writer.close();
                    }
                    else {
                    	
                    }
                    
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred.");
            } finally {
                synchronized (lock) {
                    // Reset the latch if it has reached 0
                    if (latch.getCount() == 0) {
                        latch = new CountDownLatch(2); // Reset for next pair of requests
                        prevRes = 0;
                        currentRes = 0;
                    }
                }
            }

        }
            		   
        public void update(String email, boolean won) {
            // JDBC connection parameters
        	System.out.println(email);
        	try {
				Class.forName("com.mysql.cj.jdbc.Driver");
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            String username = "root";
            String PASSWORD = ""; // Put your database password here
            Connection conn = null;
            

            // JDBC connection and statement
            try {
                // SQL UPDATE statement
            	
            	conn = DriverManager.getConnection("jdbc:mysql://localhost/leetcode_battle?user=root&password=" + PASSWORD);
                String sql;
                if (won) {
                    sql = "UPDATE users SET wins = wins + 1 WHERE email = ?";
                } else {
                    sql = "UPDATE users SET losses = losses + 1 WHERE email = ?";
                }

                // PreparedStatement to execute the SQL statement
                try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                    // Set parameters
                    stmt.setString(1, email);

                    // Execute the update
                    int rowsAffected = stmt.executeUpdate();
                    System.out.println(rowsAffected + " row(s) updated.");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    
    public int runTests(String jsonFilePath, String userCode) {
        try {
        	String apiUrl = OPENAI_URL;
        	String apiKey = OPENAI_API_KEY;
            // Create a Gson instance for parsing JSON
            Gson gson = new Gson();
            
         
            // Read the JSON file and parse it into a JsonObject
            JsonObject jsonObject = gson.fromJson(new FileReader(jsonFilePath), JsonObject.class);
            
            // Get the array of problems from the JSON object
            JsonArray problems = jsonObject.getAsJsonArray("problems");

            // Create an AtomicInteger to keep track of the number of passed tests
            AtomicInteger testsPassed = new AtomicInteger(0);
            
            // Create a CountDownLatch to wait for all test threads to complete
            CountDownLatch latch = new CountDownLatch(problems.size());

            // Iterate over each problem
            
                JsonObject problem = problems.get(this.index).getAsJsonObject();
                
                // Get the array of test cases for the current problem
                JsonArray testCases = problem.getAsJsonArray("testCases");

                // Iterate over each test case
                for (int j = 0; j < testCases.size(); j++) {
                    // Get the current test case as a JsonObject
                    JsonObject testCase = testCases.get(j).getAsJsonObject();
                    
                    // Create a new thread for each test case
                    new Thread(() -> {
                        // Run the test case and get the result
                        boolean passed = verifyCode(testCase, userCode, apiUrl, apiKey);
                
                        // If the test case passed, increment the testsPassed count
                        if (passed) {
                            testsPassed.incrementAndGet();
                        }
                        
                        // Signal that the test case thread has completed
                        latch.countDown(); 
                    }).start(); 
                }
            

            // Wait for all test case threads to complete
            latch.await();
            
       
            return testsPassed.get(); 
           
        } catch (Exception e) {
            // Print the stack trace if an exception occurs
            e.printStackTrace();
            return 0;
        }
    }

    public static boolean verifyCode(JsonObject testCase, String userCode, String apiUrl, String apiKey) {
        // Extract input and expected values using Gson
        JsonObject input = testCase.getAsJsonObject("input");
        Object expected = testCase.get("expected");
        
        // Construct the Python-like code execution prompt
        String prompt = constructCodeTestPrompt(userCode.toString(), input.toString(), expected.toString());

        
        
        // Prepare the OpenAI API request payload
        JsonObject payload = new JsonObject();
        payload.addProperty("model", "gpt-3.5-turbo-instruct");
        payload.addProperty("prompt", prompt);
        payload.addProperty("max_tokens", 50);
        
        

        try {
            // Initialize the URL connection
            URL url = new URL(apiUrl);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + apiKey);
            connection.setDoOutput(true);
            
            // Write the request payload to the connection
            try (OutputStream os = connection.getOutputStream()) {
                os.write(payload.toString().getBytes());
                os.flush();
            }

            // Check response code to decide whether to read from input or error stream
            int responseCode = connection.getResponseCode();
            BufferedReader reader;
            if (responseCode == HttpsURLConnection.HTTP_OK) {
                reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            } else {
                reader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
                System.err.println("Error from OpenAI API. Response code: " + responseCode);
            }

            // Read the response
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();
            
            // Extract the result from OpenAI API response
            JsonObject responseObj = new Gson().fromJson(response.toString(), JsonObject.class);
            String result = responseObj.getAsJsonArray("choices").get(0).getAsJsonObject().get("text").getAsString().trim();

            
            // Compare the result with the expected outcome
            if (result.equals("true") || result.equals("True")) {
            	return true;
            }
            else {
            	return false;
            }
            //return result.equals(expected.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // Helper function to construct the Python execution prompt
    public static String constructCodeTestPrompt(String userCode, String inputParameters, String expectedOutput) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Your task is to evaluate the following user code and check if it matches the expected output.\n")
	        .append("Input Parameters: ").append(inputParameters).append("\n")
	        .append("User Code:\n").append(userCode).append("\n\n")
	        .append("Execute the user code with the input parameters provided and return whether the output matches the expected result.\n")
	        .append("Expected Output: ").append(expectedOutput).append("\n\n")
	        .append("If the result matches the expected output exactly, respond with the single word 'true'. Otherwise, respond with the single word 'false'.\n");

        return prompt.toString();
    }

}
