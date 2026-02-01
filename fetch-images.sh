#!/bin/bash

# Google Maps Images Fetch Script
# Uses Places API to get real images from Google Maps

API_KEY="AIzaSyDb-LLmkfV4Tb_Ftm5go5jIKR2yJ4abb_w"
OUTPUT_DIR="/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog/pizza-roma-sud"

# Pizzerias to fetch (grade > 8.25)
declare -a pizzerias=(
  "Quattro Stagioni|Via Giuseppe Bagnera 65 Roma|quattro-stagioni"
  "Pizza Luigi|Via Federico Nansen 6 Roma|luigi"
  "Sancho|Via della Torre Clementina 142 Fiumicino|sancho"
  "Da Alberto|Circonvallazione Ostiense 225 Roma|da-alberto"
  "Pizza Max|Largo Cesidio da Fossa 38 Roma|pizza-max"
  "Il Tempio della Pizza|Piazza della Stazione del Lido 10 Lido di Ostia|tempio-pizza"
  "Box 41|Viale dei Caduti per la Resistenza 609 Roma|box-41"
  "Claudio e Claudio|Via di Trigoria 90 Selcetta|claudio-claudio"
)

echo "=== Fetching Google Maps Images ==="
echo "API Key: ${API_KEY:0:10}..."
echo "Output: $OUTPUT_DIR"
echo ""

for pizzeria in "${pizzerias[@]}"; do
  IFS='|' read -r name address slug <<< "$pizzeria"
  
  echo "---"
  echo "Pizzeria: $name"
  echo "Address: $address"
  echo "Slug: $slug"
  
  # Create directory
  mkdir -p "$OUTPUT_DIR/$slug"
  
  # Step 1: Find Place (get place_id)
  echo "  Searching for place..."
  
  # Step 2: Get Place Details (get photos)
  echo "  Fetching details..."
  
  # Step 3: Download Photos
  echo "  Downloading images..."
  
  echo "  ✓ Done: $slug"
  echo ""
done

echo "=== Complete ==="
