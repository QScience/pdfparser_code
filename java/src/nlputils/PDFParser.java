package nlputils;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
import java.util.LinkedList;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.MyPDFTextStripper;

import com.snowtide.pdf.OutputTarget;
import com.snowtide.pdf.PDFTextStream;

public class PDFParser {

  private MyPDFTextStripper stripper;
  private boolean debug;
  public static final char[] TO_REPLACE = { 64256, 64257, 64258, 64259, 64260 };
  public static final String[] REPLACE_FOR = { "ff", "fi", "fl", "ffi", "ffl" };

  public PDFParser() {
    this(false);
  }

  public PDFParser(boolean d) {
    try {
      stripper = new MyPDFTextStripper();
      debug = d;
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public String getPDFText(String pdfFileLoc, List<String> sections) {
    StringBuffer sb = new StringBuffer(1024);
    String content;
    try {
      PDFTextStream stream = new PDFTextStream(pdfFileLoc);
      // get OutputTarget configured to pipe text to the provided StringBuffer
      OutputTarget tgt = new OutputTarget(sb);
      stream.pipe(tgt);
      stream.close();
    } catch (Exception e) {
      try {
        PDDocument doc = PDDocument.load(pdfFileLoc);
        content = stripper.getPDFText(doc, sections);
        doc.close();
      } catch (Exception e2) {
        if (debug) {
          e2.printStackTrace();
        } else {
          System.err.println("File " + pdfFileLoc + " could not be parsed.");
        }
      }
    }

    content = sb.toString().replaceAll("-(\r?\n|\r\n?)+", "");
    sb = new StringBuffer(content.length());
    for (int i = 0; i < content.length(); ++i) {
      char c = content.charAt(i);
      boolean replaced = false;
      for (int r = 0; r < TO_REPLACE.length; ++r) {
        if (c == TO_REPLACE[r]) {
          sb.append(REPLACE_FOR[r]);
          replaced = true;
        }
      }
      if (!replaced) {
        sb.append(c);
      }
    }
    return sb.toString();
  }

  public String parseURL(String url) {
    try {
      PDDocument doc = PDDocument.load(new URL(url));
      String content = stripper.getPDFText(doc, new LinkedList<String>());
      doc.close();
      return content;
    } catch (IOException e) {
      System.err.println("Cannot open PDF from URL " + e.getMessage());
      return "";
    }
  }

  public static void main(String[] args) {
    String input = "./pdfs/";
    String output = "";
    
    if (args.length < 1) {
      System.err.println("Sorry, I need at least 1 argument.\narg 1: the input file or folder [required]\narg 2: the output file or folder [optional]");
      System.exit(1);
    }
    input = args[0];
    
    if (args.length > 1) {
      output = args[1];
    }
    
    if (new File(input).isDirectory() && input.charAt(input.length() - 1) != '/') {
      input += "/";
    }
    
    if (new File(input).isDirectory() && output.length() > 0 && output.charAt(output.length() - 1) != '/') {
      output += "/";
    }
    
    if (new File(input).isDirectory() && output.length() > 0 && !new File(output).isDirectory()) {
      new File(output).mkdir();
    }
    
    long time = System.currentTimeMillis();
    PDFParser pdf = new PDFParser();
    try {
      String fileName;
      List<String> fileNames = new LinkedList<>();
      if (new File(input).isFile()) {
        fileNames.add(input);
      } else if (new File(input).isDirectory()) {
        for (String file : new File(input).list()) {
          if (!file.toLowerCase().endsWith(".pdf")) {
            continue;
          }
          fileNames.add(input + file);
        }
      }
      for (String filePath : fileNames) {
        if (!filePath.toLowerCase().endsWith(".pdf")) {
          continue;
        }
        fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
        List<String> sections = new LinkedList<>();
        String text = pdf.getPDFText(filePath, sections);
        StringBuffer rewrittenOutput = new StringBuffer();
//        System.err.println(filePath);
        text = text.replaceAll(" +", " ").trim();
        for (int i = 0; i < text.length(); ++i) {
          char c = text.charAt(i);
          boolean replaced = false;
          for (int r = 0; r < TO_REPLACE.length; ++r) {
            if (c == TO_REPLACE[r]) {
              rewrittenOutput.append(REPLACE_FOR[r]);
              replaced = true;
            }
          }
          if (!replaced) {
            rewrittenOutput.append(c);
          }
        }
        String outName = "";
        if (output.length() > 0) {
          if (new File(input).isDirectory()) {
            outName = output + fileName + ".txt";
          } else if (new File(input).isFile()) {
            outName = output;
          }
        } else {
          outName = filePath + ".txt";
        }
        PrintWriter out = new PrintWriter(outName);
        out.println(rewrittenOutput);
        out.close();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    System.err.println("Elapsed time: " + (System.currentTimeMillis() - time) / 1000.0d + " secs.");
  }
}
