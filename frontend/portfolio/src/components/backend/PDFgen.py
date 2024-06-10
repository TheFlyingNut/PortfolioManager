from fpdf import FPDF
import google.generativeai as genai
import os
from os import path
from os.path import expanduser
genai.configure(api_key="AIzaSyDBmv6C1nd299XgW54t9ZLeYegiGeeoi8w")
current_value = 10000.50
invested_value = 8000.00
overall_profit_loss = 2000.50
daily_profit_loss = 100.25
money_in_crypto = 2500.00
price_extremes = {"AAPL": (150, 180), "BTC": (30000, 45000)}
transaction_history = [{"symbol": "AAPL", "quantity": 10, "price": 160}]
watchlist = ["GOOG", "TSLA"]
#api_key = 'AIzaSyDtCZusLmb1mNAj8L6955TrUyIdndp9Sos'
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content(f'Consider the following parameters in context of financial portfolio and summarise in bullets. Current Value={current_value},Invested Value={invested_value},Overall Profit/Loss={overall_profit_loss}, Daily Profit/Loss={daily_profit_loss},Money in crypto={money_in_crypto}, Companies in watchlist:{watchlist} and Transaction History:{transaction_history}. Also suggest various investment strategies with respect to my current portfolio')
# Define the string for the paragraph
s = response.text
s=s.replace('*','')
# Create a PDF class
class PDF(FPDF):
    def header(self):
        # Add a centered heading
        self.set_font("Helvetica", size=36)
        self.cell(0, 20, txt="Portfolio Summary", ln=True, align="C")

    # def footer(self):
    #     # Add a page number
    #     self.set_y(-15)
    #     self.set_font("Helvetica", size=10)
    #     self.cell(0, 10, txt="Page " + str(self.page_no()), ln=True, align="C")

    def chapter_title(self, title):
        # Add a chapter title
        self.set_font("Helvetica", size=16)
        self.cell(0, 20, txt=title, ln=True, align="L")  # Increased spacing

    def chapter_body(self, body):
        # Add a paragraph
        self.set_font("Helvetica", size=12)
        self.multi_cell(0, 5, txt=body, align="L")

    def add_image_with_caption(self, image_path, caption):
        # Add an image with a caption
        page_width = self.w - 2 * self.l_margin  # Width of the page minus left and right margins
        image_width = 150  # Width of the image
        x = (page_width - image_width) / 2  # Calculate x-coordinate for centering
        self.image(image_path, x=x, y=self.get_y() + 10, w=image_width)
        self.set_font("Helvetica", size=10)
        self.cell(0, 10, txt=caption, ln=True, align="C")

# Create a PDF instance
pdf = PDF()
pdf.add_page()

# Add the paragraph
pdf.chapter_body(s)

# Add an image (replace 'path/to/your/image.png' with the actual image path)
pdf.add_image_with_caption(r"C:\Users\karti\Downloads\Codeshastra_Tabs_Not_Spaces\frontend\portfolio\src\components\backend\graph_stock.png", "fig 1")
downloads_folder = os.path.join(os.path.expanduser("~"), "Downloads")
# Save the PDF in the Downloads folder
pdf_file_path = os.path.join(downloads_folder, "Summary_Portfolio.pdf")
pdf.output(pdf_file_path)
# Save the PDF as "summary.pdf"
# pdf.output("Summary_Portfolio.pdf")

# Print a success message
print("summary.pdf was successfully generated.")
