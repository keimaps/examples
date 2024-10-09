from PIL import Image

def black_to_transparent(input_path, output_path, threshold=10):
    # Open the input image
    with Image.open(input_path) as img:
        # Convert the image to RGBA mode
        img = img.convert("RGBA")
        
        # Get the pixel data
        datas = img.getdata()
        
        # Create a new list to store the modified pixel data
        new_data = []
        
        # Iterate through each pixel
        for item in datas:
            # If the pixel is black (or close to black), make it transparent
            if item[0] <= threshold and item[1] <= threshold and item[2] <= threshold:
                new_data.append((255, 255, 255, 0))  # Fully transparent
            else:
                new_data.append(item)  # Keep the original color
        
        # Update the image with the new pixel data
        img.putdata(new_data)
        
        # Save the resulting image as PNG
        img.save(output_path, "PNG")

# Example usage
input_image = "input.png"
output_image = "output.png"
black_to_transparent(input_image, output_image)
