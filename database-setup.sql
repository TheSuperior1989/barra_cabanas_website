-- Create line_item_descriptions table for storing reusable descriptions
CREATE TABLE IF NOT EXISTS line_item_descriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL UNIQUE,
  usage_count INTEGER DEFAULT 1,
  last_used TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_line_item_descriptions_description 
ON line_item_descriptions(description);

-- Create index for usage tracking
CREATE INDEX IF NOT EXISTS idx_line_item_descriptions_usage 
ON line_item_descriptions(usage_count DESC, last_used DESC);

-- Create default_pricing table for house-specific pricing
CREATE TABLE IF NOT EXISTS default_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  house_type TEXT NOT NULL UNIQUE CHECK (house_type IN ('whale-house', 'manta-house')),
  default_unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default pricing if not exists
INSERT INTO default_pricing (house_type, default_unit_price) 
VALUES 
  ('whale-house', 2500.00),
  ('manta-house', 2500.00)
ON CONFLICT (house_type) DO NOTHING;

-- Create function to update usage count
CREATE OR REPLACE FUNCTION update_description_usage(desc_text TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO line_item_descriptions (description, usage_count, last_used)
  VALUES (desc_text, 1, NOW())
  ON CONFLICT (description) 
  DO UPDATE SET 
    usage_count = line_item_descriptions.usage_count + 1,
    last_used = NOW(),
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
