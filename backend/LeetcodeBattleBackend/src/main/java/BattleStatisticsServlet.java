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

@WebServlet(name = "BattleStatisticsServlet", urlPatterns = {"/battle-stats"})
public class BattleStatisticsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("updateStats".equals(action)) {
            int userId = Integer.parseInt(request.getParameter("userId"));
            boolean isWinner = Boolean.parseBoolean(request.getParameter("isWinner"));
            float battleTime = Float.parseFloat(request.getParameter("battleTime"));
            int testCasesPassed = Integer.parseInt(request.getParameter("testCasesPassed"));

            updateUserStatistics(userId, isWinner, battleTime, testCasesPassed);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("getStats".equals(action)) {
            int userId = Integer.parseInt(request.getParameter("userId"));
            String userStats = getUserStatistics(userId);

            PrintWriter pw = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            pw.write(userStats);
            pw.flush();
        }
    }

    private void updateUserStatistics(int userId, boolean isWinner, float battleTime, int testCasesPassed) {
        try (Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/leetcode_battle", "username", "password")) {
            String query = "UPDATE users SET wins = wins + ?, losses = losses + ?, " +
                    "average_battle_time = (average_battle_time * total_battles + ?) / (total_battles + 1), " +
                    "average_test_cases_passed = (average_test_cases_passed * total_battles + ?) / (total_battles + 1), " +
                    "total_battles = total_battles + 1 WHERE user_id = ?";

            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setInt(1, isWinner ? 1 : 0);
                stmt.setInt(2, isWinner ? 0 : 1);
                stmt.setFloat(3, battleTime);
                stmt.setInt(4, testCasesPassed);
                stmt.setInt(5, userId);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private String getUserStatistics(int userId) {
        try (Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/leetcode_battle", "username", "password")) {
            String query = "SELECT wins, losses, average_battle_time, average_test_cases_passed, total_battles " +
                    "FROM users WHERE user_id = ?";

            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setInt(1, userId);

                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        int wins = rs.getInt("wins");
                        int losses = rs.getInt("losses");
                        float averageBattleTime = rs.getFloat("average_battle_time");
                        float averageTestCasesPassed = rs.getFloat("average_test_cases_passed");
                        int totalBattles = rs.getInt("total_battles");

                        Gson gson = new Gson();
                        String json = gson.toJson(new UserStats(wins, losses, averageBattleTime, averageTestCasesPassed, totalBattles));
                        return json;
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    private static class UserStats {
        private int wins;
        private int losses;
        private float averageBattleTime;
        private float averageTestCasesPassed;
        private int totalBattles;

        public UserStats(int wins, int losses, float averageBattleTime, float averageTestCasesPassed, int totalBattles) {
            this.wins = wins;
            this.losses = losses;
            this.averageBattleTime = averageBattleTime;
            this.averageTestCasesPassed = averageTestCasesPassed;
            this.totalBattles = totalBattles;
        }
    }
}
