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

@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {
	
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
    response.setContentType("application/json");
    response.addHeader("Access-Control-Allow-Origin", "*");
    PrintWriter out = response.getWriter();
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    
    if (email == null || password == null) {
    	response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    	out.println("Email and password parameters are required.");
    	return;
    }

    boolean userExists = loginUser(email, password);

    if (!userExists) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        String err = "Email or password is incorrect. Please try again.";
        out.println(err);
    } else {
        response.setStatus(HttpServletResponse.SC_OK);
        HttpSession session = request.getSession();
        session.setAttribute("email", email);
    }
}

	private boolean loginUser(String email, String password) {
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
        
		try {
			 Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			 e.printStackTrace();
		}
		
        try {
        	conn = DriverManager.getConnection("jdbc:mysql://localhost/leetcode_battle?user=root&password=" + PASSWORD);
        	st = conn.createStatement();
        	rs = st.executeQuery("SELECT * FROM users WHERE email='" + email + "'");
        	if (rs.next()) {
        		st = conn.createStatement();
        		rs = st.executeQuery("SELECT * FROM users WHERE password='" + password + "'");
        		if (rs.next()) {
        			rs.close();
        			return true;
        		}
        	}
        } catch (Exception e) {
        	e.printStackTrace();
        }
        
        return false;
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
