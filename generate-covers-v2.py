from PIL import Image, ImageDraw, ImageFont
import os

def create_cover(title, subtitle, bg_colors, pizza_emoji, output_path):
    """Create a cover image with gradient background and pizza emoji"""
    width, height = 1200, 630
    
    # Create image
    img = Image.new('RGB', (width, height), bg_colors[0])
    draw = ImageDraw.Draw(img)
    
    # Create gradient background
    for y in range(height):
        ratio = y / height
        r = int(bg_colors[0][0] * (1 - ratio) + bg_colors[1][0] * ratio)
        g = int(bg_colors[0][1] * (1 - ratio) + bg_colors[1][1] * ratio)
        b = int(bg_colors[0][2] * (1 - ratio) + bg_colors[1][2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Try to load fonts
    try:
        # Try system fonts
        title_font = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 100)
        subtitle_font = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 32)
        badge_font = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 20)
    except:
        try:
            title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 100)
            subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
            badge_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
        except:
            title_font = ImageFont.load_default()
            subtitle_font = badge_font = title_font
    
    # Draw decorative circles
    circle_color = (255, 255, 255, 30)
    draw.ellipse([800, 100, 1100, 400], fill=(255, 255, 255, 10))
    draw.ellipse([900, 300, 1200, 600], fill=(255, 255, 255, 8))
    
    # Draw pizza emoji large in background
    emoji_font = ImageFont.truetype("/System/Library/Fonts/Apple Color Emoji.ttc", 300) if os.path.exists("/System/Library/Fonts/Apple Color Emoji.ttc") else title_font
    
    # For non-emoji fallback, use text
    try:
        bbox = draw.textbbox((0, 0), pizza_emoji, font=emoji_font)
        emoji_width = bbox[2] - bbox[0]
        draw.text(((width - emoji_width) // 2, 50), pizza_emoji, font=emoji_font)
    except:
        # Fallback - draw a circle as pizza representation
        draw.ellipse([(width//2 - 150, 80), (width//2 + 150, 380)], fill="#ff6900", outline="#ff8833", width=5)
        draw.ellipse([(width//2 - 120, 110), (width//2 + 120, 350)], fill="#ffcc00")
        # Draw pepperoni
        for x, y in [(width//2-60, 180), (width//2+40, 200), (width//2, 280), (width//2-30, 240), (width//2+50, 260)]:
            draw.ellipse([(x-15, y-15), (x+15, y+15)], fill="#cc3300")
    
    # Draw title
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    draw.text(((width - title_width) // 2, 380), title, fill="white", font=title_font)
    
    # Draw decorative line
    line_width = 80
    line_y = 510
    draw.rectangle([((width - line_width) // 2, line_y), ((width + line_width) // 2, line_y + 4)], fill="#ff6900")
    
    # Draw subtitle
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = bbox[2] - bbox[0]
    draw.text(((width - subtitle_width) // 2, 530), subtitle, fill="rgba(255,255,255,0.9)", font=subtitle_font)
    
    # Save
    img.save(output_path, 'PNG')
    print(f"Created {output_path}")

# Generate all covers with different color schemes
blog_dir = '/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog'

covers = [
    {
        'title': 'Roma Sud',
        'subtitle': 'Marconi · Garbatella · Ostia',
        'colors': [(180, 80, 40), (120, 50, 30)],  # Warm terracotta/orange
        'emoji': '🍕',
        'filename': 'pizza-roma-sud-cover.png'
    },
    {
        'title': 'Roma Nord',
        'subtitle': 'Tufello · Trieste · Prati',
        'colors': [(60, 80, 140), (40, 50, 100)],  # Cool blue/purple
        'emoji': '🍕',
        'filename': 'pizza-roma-nord-cover.png'
    },
    {
        'title': 'Roma Est',
        'subtitle': 'Centocelle · Tuscolano · Pigneto',
        'colors': [(50, 120, 80), (30, 80, 60)],  # Green/nature
        'emoji': '🍕',
        'filename': 'pizza-roma-est-cover.png'
    },
    {
        'title': 'Roma Ovest',
        'subtitle': 'Monteverde · Trullo · Magliana',
        'colors': [(160, 120, 50), (120, 90, 40)],  # Warm yellow/gold
        'emoji': '🍕',
        'filename': 'pizza-roma-ovest-cover.png'
    }
]

for cover in covers:
    output_path = os.path.join(blog_dir, cover['filename'])
    create_cover(
        cover['title'],
        cover['subtitle'],
        cover['colors'],
        cover['emoji'],
        output_path
    )

print("\nAll cover images generated!")
