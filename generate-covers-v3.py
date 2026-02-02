from PIL import Image, ImageDraw, ImageFont
import os

def draw_pizza(draw, cx, cy, size):
    """Draw a simple pizza icon"""
    # Pizza crust (outer circle)
    crust_color = (210, 130, 70)  # Golden brown
    draw.ellipse([(cx - size, cy - size), (cx + size, cy + size)], fill=crust_color)
    
    # Cheese (inner circle)
    cheese_color = (255, 220, 120)  # Yellow cheese
    cheese_size = int(size * 0.85)
    draw.ellipse([(cx - cheese_size, cy - cheese_size), (cx + cheese_size, cy + cheese_size)], fill=cheese_color)
    
    # Pepperoni circles
    pepperoni_color = (180, 50, 40)  # Red
    pepperoni_size = int(size * 0.18)
    positions = [
        (cx - int(size*0.4), cy - int(size*0.3)),
        (cx + int(size*0.35), cy - int(size*0.25)),
        (cx, cy + int(size*0.35)),
        (cx - int(size*0.2), cy + int(size*0.1)),
        (cx + int(size*0.25), cy + int(size*0.15)),
    ]
    for px, py in positions:
        draw.ellipse([(px - pepperoni_size, py - pepperoni_size), (px + pepperoni_size, py + pepperoni_size)], fill=pepperoni_color)

def create_cover(title, subtitle, bg_colors, output_path):
    """Create a cover image with gradient background and pizza icon"""
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
    
    # Draw decorative translucent circles
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.ellipse([800, 50, 1100, 350], fill=(255, 255, 255, 15))
    overlay_draw.ellipse([900, 250, 1200, 550], fill=(255, 255, 255, 10))
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(img)
    
    # Draw pizza icon
    draw_pizza(draw, width // 2, 220, 140)
    
    # Try to load fonts - fallback to default if not available
    try:
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 90)
        subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = title_font
    
    # Draw title
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    draw.text(((width - title_width) // 2, 380), title, fill="white", font=title_font)
    
    # Draw decorative line
    line_width = 80
    line_y = 500
    draw.rectangle([((width - line_width) // 2, line_y), ((width + line_width) // 2, line_y + 4)], fill="#ff6900")
    
    # Draw subtitle
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = bbox[2] - bbox[0]
    draw.text(((width - subtitle_width) // 2, 520), subtitle, fill=(240, 240, 240), font=subtitle_font)
    
    # Save
    img.save(output_path, 'PNG')
    print(f"Created {output_path}")

# Generate all covers with different color schemes
blog_dir = '/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog'

covers = [
    {
        'title': 'Roma Sud',
        'subtitle': 'Marconi · Garbatella · Ostia',
        'colors': [(200, 100, 50), (140, 60, 35)],  # Warm terracotta/orange
        'filename': 'pizza-roma-sud-cover.png'
    },
    {
        'title': 'Roma Nord',
        'subtitle': 'Tufello · Trieste · Prati',
        'colors': [(70, 90, 150), (45, 60, 110)],  # Cool blue/purple
        'filename': 'pizza-roma-nord-cover.png'
    },
    {
        'title': 'Roma Est',
        'subtitle': 'Centocelle · Tuscolano · Pigneto',
        'colors': [(60, 130, 90), (40, 90, 70)],  # Green/nature
        'filename': 'pizza-roma-est-cover.png'
    },
    {
        'title': 'Roma Ovest',
        'subtitle': 'Monteverde · Trullo · Magliana',
        'colors': ((170, 130, 60), (130, 100, 50)),  # Warm yellow/gold
        'filename': 'pizza-roma-ovest-cover.png'
    }
]

for cover in covers:
    output_path = os.path.join(blog_dir, cover['filename'])
    create_cover(
        cover['title'],
        cover['subtitle'],
        cover['colors'],
        output_path
    )

print("\nAll cover images generated!")
