import java.util.ArrayList;
import java.util.Random;

public class JavaDemoObject {
	private static final String[] NAMES = { "Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
			"India", "Juliett", "Kilo", "Lima", "Miko", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra",
			"Tango", "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu" };

	// Private Variables
	private String m_textProperty;

	// Accessors.
	public String getTextProperty() {
		return this.m_textProperty;
	}

	// Constructor.
	public JavaDemoObject(String textProp) {
		this.m_textProperty = textProp;
	}

	// Methods.
	public static void SortAListOf(final int length) {
		ArrayList<JavaDemoObject> list = new ArrayList<>();
		Random random = new Random();

		for (int i = 0; i < length; i++) {
			String text = JavaDemoObject.NAMES[random.nextInt(26) + 1];
			list.add(new JavaDemoObject(text));
		}

		list.sort((obj, other) -> obj.getTextProperty().compareTo(other.getTextProperty()));

		for (JavaDemoObject obj : list) {
			System.out.println(obj.getTextProperty());
		}
	}

	public static void main(String[] args) {
		JavaDemoObject.SortAListOf(10);
	}
}
