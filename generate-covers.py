from PIL import Image, ImageDraw, ImageFont
import os

def create_cover(title, subtitle, output_path):
    # Create image with dark gradient background
    width, height = 1200, 630
    img = Image.new('RGB', (width, height), '#1a1a2e')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background (simplified)
    for y in range(height):
        # Gradient from #1a1a2e to #0f3460
        r = int(26 + (15 - 26) * y / height)
        g = int(26 + (52 - 26) * y / height)
        b = int(46 + (96 - 46) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Try to load fonts, fall back to default
    try:
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 80)
        subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
        badge_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
        logo_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = badge_font = logo_font = title_font
    
    # Draw decorative circles
    draw.ellipse([800, 400, 1100, 700], fill='#ff690010')
    draw.ellipse([900, 100, 1200, 400], fill='#ff690008')
    
    # Draw logo
    logo_text = "CRAVIT GUIDE"
    bbox = draw.textbbox((0, 0), logo_text, font=logo_font)
    logo_width = bbox[2] - bbox[0]
    draw.text(((width - logo_width) // 2, 80), logo_text, fill='#ff6900', font=logo_font)
    
    # Draw title
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    draw.text(((width - title_width) // 2, 200), title, fill='white', font=title_font)
    
    # Draw accent line
    line_width = 100
    draw.rectangle([((width - line_width) // 2, 320), ((width + line_width) // 2, 328)], fill='#ff6900')
    
    # Draw subtitle
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = bbox[2] - bbox[0]
    draw.text(((width - subtitle_width) // 2, 360), subtitle, fill='#cccccc', font=subtitle_font)
    
    # Draw badge
    badge_text = "LE MIGLIORI PIZZE"
    bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
    badge_width = bbox[2] - bbox[0]
    badge_height = bbox[3] - bbox[1]
    badge_padding = 15
    badge_rect = [
        (width - badge_width) // 2 - badge_padding,
        450,
        (width + badge_width) // 2 + badge_padding,
        450 + badge_height + badge_padding * 2
    ]
    draw.rounded_rectangle(badge_rect, radius=25, fill='#ff6900')
    draw.text(((width - badge_width) // 2, 450 + badge_padding), badge_text, fill='white', font=badge_font)
    
    # Save
    img.save(output_path, 'PNG')
    print(f"Created {output_path}")

# Generate all covers
blog_dir = '/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog'

covers = [
    ('Roma Sud', 'Marconi · Garbatella · Ostia', 'pizza-roma-sud-cover.png'),
    ('Roma Nord', 'Tufello · Trieste · Prati', 'pizza-roma-nord-cover.png'),
    ('Roma Est', 'Centocelle · Tuscolano · Pigneto', 'pizza-roma-est-cover.png'),
    ('Roma Ovest', 'Monteverde · Trullo · Magliana', 'pizza-roma-ovest-cover.png'),
]

for title, subtitle, filename in covers:
    output_path = os.path.join(blog_dir, filename)
    create_cover(title, subtitle, output_path)

print("\nAll cover images generated!")
