import java.util.*;
import java.io.*;

public class IncreasingSubstring
{
	public static void main(String[] args) 
	{
        Scanner in = new Scanner(new BufferedReader(new InputStreamReader(System.in)));
        int t = in.nextInt(); // Scanner has functions to read ints, longs, strings, chars, etc.
        for (int i = 1; i <= t; ++i) 
        {
            int n = in.nextInt();
            in.nextLine();
            String s = in.nextLine();

            String sub = "";

            System.out.print("Case #" + i + ":");

            for (int x = 0; x < n; x++)
        	{
        		if (s.substring(x, x+1).compareTo(sub) > 0)
        		{
        			sub += s.substring(x, x+1);
        		}
        		else
        		{
        			sub = s.substring(x, x+1);
        		}

        		System.out.print(" " + sub.length());
        	}

        	System.out.println();

            
        }
    }
}