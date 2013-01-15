package nlputils;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class PDFLine {
  public static Map<Float, Integer> docLevelCharSizes;
  private float deltaWidth;
  private float mostFrequentFontSize;
  private float maxFontSize;
  private float minFontSize;
  private String content;
  private int characterNumber;
  private int tokenNumber;
  private int alphaTokenNumber;
  private float mostFrequentHeight;
  private Map<Float, Integer> heights;
  private Map<Float, Integer> charSizes;

  public PDFLine(Map<Float, Integer> hs, float deltaW, Map<Float, Integer> characterSizes, String text) {
    docLevelCharSizes = new HashMap<Float, Integer>();
    float maxValue = 0, minValue = Float.MAX_VALUE;
    int maxOccurrence = 0;
    heights = hs;
    charSizes = characterSizes;
    for (Entry<Float, Integer> heightEntry : heights.entrySet()) {
      if (heightEntry.getValue() > maxOccurrence) {
        maxOccurrence = heightEntry.getValue();
        mostFrequentHeight = heightEntry.getKey();
      }
    }
    for (Entry<Float, Integer> charEntry : charSizes.entrySet()) {
      if (charEntry.getValue() > maxOccurrence) {
        maxOccurrence = charEntry.getValue();
        mostFrequentFontSize = charEntry.getKey();
      }
      if (charEntry.getKey() > maxValue) {
        maxValue = charEntry.getKey();
      }
      if (charEntry.getKey() < minValue) {
        minValue = charEntry.getKey();
      }
      characterNumber += charEntry.getValue();
    }
    content = text.trim();
    deltaWidth = deltaW;
    minFontSize = minValue;
    maxFontSize = maxValue;
    String[] toks = content.split(" ");
    tokenNumber = toks.length;
    alphaTokenNumber = countNumTokens(toks);
  }

  public static int countNumTokens(String[] tokens) {
    int num = 0;
    for (String token : tokens) {
      if (isAlpha(token))
        num++;
    }
    return num;
  }

  /* modified from apache StringUtils */
  public static boolean isAlpha(String str) {
    if (str == null) {
      return false;
    }
    int sz = str.length();
    for (int i = 0; i < sz; i++) {
      if (Character.isLetter(str.charAt(i)) == false && str.charAt(i) != '-' && str.charAt(i) != ',' && str.charAt(i) != '.'
          && str.charAt(i) != '!' && str.charAt(i) != '?' && str.charAt(i) != ':') {
        return false;
      }
    }
    return true;
  }

  public int numOfAlphaTokens() {
    return alphaTokenNumber;
  }

  public int numOfTokens() {
    return tokenNumber;
  }

  public float getMostFrequentHeight() {
    return mostFrequentHeight;
  }

  public float getMaxFontSize() {
    return maxFontSize;
  }

  public float getMostFrequentFontSize() {
    return mostFrequentFontSize;
  }

  public float getMinFontSize() {
    return minFontSize;
  }

  public Map<Float, Integer> getCharSizes() {
    return charSizes;
  }

  public int length() {
    return characterNumber;
  }

  public double[] asFeatureVector() {
    return new double[] { mostFrequentHeight, deltaWidth, maxFontSize, minFontSize, mostFrequentFontSize, tokenNumber, characterNumber,
        content.contains(".") ? 1 : 0 };
  }

  public String getContent() {
    return content;
  }

  public String toString() {
    return content;
  }
}
