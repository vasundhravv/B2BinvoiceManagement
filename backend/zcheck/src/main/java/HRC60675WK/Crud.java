package HRC60675WK;


	import java.sql.Connection;
	import java.sql.DriverManager;
	import java.sql.SQLException;

	public class Crud {
		public static Connection createConnect() {
			Connection con = null;
			final String URL="jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
			final String USER="root";
			final String PASS="Vasu@2573";
			try {
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");//driver load 
				}
				catch (ClassNotFoundException e)
				{
					e.printStackTrace();
				}
				con = DriverManager.getConnection(URL, USER, PASS);
				System.out.println("Post Connect - " +con);
				
			}
			catch(SQLException e)
			{
				System.out.println("Error Occurred");
				e.printStackTrace();
			}
			return con;
			
		}	
	
}
