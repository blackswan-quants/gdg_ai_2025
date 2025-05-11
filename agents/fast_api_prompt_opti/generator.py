import google.generativeai as genai


class ContentGenerator:
    def __init__(self, google_api_key: str):
        genai.configure(api_key=google_api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash-002')
        self.prompts = [
            "Explain the concept in a simple and engaging way, focusing on practical examples.",
            "Generate a picture with tzik and latex",
            "Break down the concept into its fundamental components and explain each part.",
            
            "Present the concept through a real-world scenario or case study."
        ]
    
    def generate_content_and_test(self, text: str, prompt: str) -> Tuple[str, str, bool]:
        # Generate content using the selected prompt
        content_prompt = f"""
        Given the following text: "{text}"
        
        {prompt}
        
        Also, create a simple true/false question to test understanding of the key concept.
        Format your response as:
        CONTENT: [your explanation]
        QUESTION: [true/false question]
        ANSWER: [true/false]
        """
        
        try:
            response = self.model.generate_content(content_prompt)
            response_text = response.text
            
            # Parse the response
            try:
                content = response_text.split("QUESTION:")[0].replace("CONTENT:", "").strip()
                question_part = response_text.split("QUESTION:")[1].split("ANSWER:")[0].strip()
                answer = response_text.split("ANSWER:")[1].strip().lower()
                correct_answer = answer == "true"
                
                return content, question_part, correct_answer
            except:
                # Fallback in case of parsing error
                return response_text, "Is this statement true or false?", True
        except Exception as e:
            print(f"Error generating content: {str(e)}")
            return "Error generating content. Please try again.", "Is this statement true or false?", True