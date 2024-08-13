import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.CountDownLatch;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/findbattle")
public class BattleQ extends HttpServlet {
    private static final Object lock = new Object();
    private static CountDownLatch latch = new CountDownLatch(2);
    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "POST");
        resp.addHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.addHeader("Access-Control-Max-Age", "3600");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("text/plain");

        try {
            latch.countDown(); // Decrement latch
            latch.await(); // Wait until latch count is 0

            synchronized (lock) {
                // Send response to the request
                PrintWriter writer = response.getWriter();
                writer.println("Starting Battle...");
                writer.close();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred.");
        } finally {
            synchronized (lock) {
                // Reset the latch if it has reached 0
                if (latch.getCount() == 0) {
                    latch = new CountDownLatch(2); // Reset for next pair of requests
                }
            }
        }
    }
}



    

