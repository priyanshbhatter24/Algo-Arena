import java.io.IOException;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import com.google.gson.Gson;
import java.sql.DriverManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;




@WebServlet(name = "RegisterServlet", urlPatterns = {"/register"})
public class RegisterServlet extends HttpServlet {
	public String PASSWORD = "";
	
	
	private static int userID = 0;
	private static final long serialVersionUID = 1L;
	
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "POST");
        resp.addHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.addHeader("Access-Control-Max-Age", "3600");
        resp.setStatus(HttpServletResponse.SC_OK);
    }
    
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("application/json");
	    PrintWriter out = response.getWriter();
	    System.out.println("here");
	    
	    String email = request.getParameter("email");
	    String password = request.getParameter("password");
	    
	    System.out.println("Email: " + email);
	    System.out.println("Password: " + password);
	    
	    if (email != null && !email.isEmpty() && password != null && !password.isEmpty()) {
	        if (registerUser(email, password)) {
	        	response.setStatus(HttpServletResponse.SC_OK);
	            HttpSession session = request.getSession();
	            session.setAttribute("email", email);	
	        } else {
	            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
	            out.println("Email already registered.");
	        }
	    } else {
	        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
	        out.println("Invalid email or password.");
	    }
	}

	 private boolean registerUser(String email, String password) {
		 try {
			 Class.forName("com.mysql.cj.jdbc.Driver");
		 } catch (ClassNotFoundException e) {
			 e.printStackTrace();
		 }
		 
		 Connection conn = null;
		 Statement st = null;
		 ResultSet rs = null;
		 
		 userID = -1;
		 
		 try {
			 conn = DriverManager.getConnection("jdbc:mysql://localhost/leetcode_battle?user=root&password=" + PASSWORD); // insert database
			 st = conn.createStatement();
			 rs = st.executeQuery("SELECT * FROM users WHERE email='" + email + "'");
			 if (!rs.next()) {
				rs.close();
				st.execute("INSERT INTO users (email, password) VALUES ('" + email + "', '" + password + "')");
				rs = st.executeQuery("SELECT LAST_INSERT_ID()");
				rs.next();
				System.out.println("hello");
				userID = rs.getInt(1);
			 } else {
				return false;
			 }
		 } catch (SQLException e) {
			 e.printStackTrace();
		 } finally {
			 try {
				 if (rs != null) {
					 rs.close();
				 }
				 if (st != null) {
					 st.close();
				 }
				 if (conn != null) {
					 conn.close();
				 }
			 } catch (SQLException e) {
				 e.printStackTrace();
			 }
		 }
		 
		 return true;
    }
	 
	
	private int getID(String email) {
    	try {
			 Class.forName("com.mysql.cj.jdbc.Driver");
		 } catch (ClassNotFoundException e) {
			 e.printStackTrace();
		 }
		 
		 Connection conn = null;
		 Statement st = null;
		 ResultSet rs = null;
		 
		 int user_id = -1;
		 
		 try {
			 conn = DriverManager.getConnection("jdbc:mysql://localhost/leetcode_battle?user=root&password=" + PASSWORD);
			 st = conn.createStatement();
			 rs = st.executeQuery("SELECT id FROM users WHERE email = '" + email + "'");
			 
			 if (rs.next()) {
				 user_id = rs.getInt("user_id");
			 } else {
				 return -1;
			 }
		 } catch (Exception e) {
			 e.printStackTrace();
		 } finally {
	        try {
	            if (rs != null) {
	                rs.close();
	            }
	            if (st != null) {
	                st.close();
	            }
	            if (conn != null) {
	                conn.close();
	            }
	        } catch (Exception ex) {
	            ex.printStackTrace();
	        }
		 }
		 
		 return user_id;
    }
}
