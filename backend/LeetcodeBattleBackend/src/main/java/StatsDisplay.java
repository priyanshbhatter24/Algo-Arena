import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;


@WebServlet("/showStats")
public class StatsDisplay extends HttpServlet {
	
	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	response.addHeader("Access-Control-Allow-Origin", "*");
    	response.setContentType("application/json");
    	
    	String email = request.getParameter("email");
    	
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
        	Gson gson = new Gson();
            String jsonResult = null;

        	conn = DriverManager.getConnection("jdbc:mysql://localhost/leetcode_battle?user=root&password=" + PASSWORD);
        	String sql = "SELECT wins, losses FROM users WHERE email = ?";
        	
        	 try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                 // Set parameters
                 stmt.setString(1, email);
                 try (ResultSet rs = stmt.executeQuery()) {
                     // Check if there is a result
                     if (rs.next()) {
                         // Extract wins and losses from the result set
                         int wins = rs.getInt("wins");
                         int losses = rs.getInt("losses");

                         // Create a JSON object to hold wins and losses
                         // and serialize it to a JSON string
                         jsonResult = gson.toJson(new WinsAndLosses(wins, losses));
                         PrintWriter writer = response.getWriter();
                         writer.println(jsonResult);
                         writer.close();
                     }
                 }
        	 }	
        	
        	 
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
    	
	}
	
	private static class WinsAndLosses {
        private int wins;
        private int losses;

        public WinsAndLosses(int wins, int losses) {
            this.wins = wins;
            this.losses = losses;
        }
    }
}
