CREATE TABLE translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  en TEXT,
  vi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bật Row Level Security (RLS)
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Cho phép tất cả mọi người có thể xem (Select) dữ liệu ngôn ngữ (để Frontend tải được)
CREATE POLICY "Cho phép tất cả đọc ngôn ngữ" ON translations
  FOR SELECT
  USING (true);

-- Insert dữ liệu mẫu
INSERT INTO translations (key, en, vi) VALUES
  ('welcome_msg', 'Welcome to base SEO with Next.js', 'Chào mừng đến với base SEO bằng Next.js'),
  ('desc_msg', 'Performance-first. SEO-ready. Vercel-optimized. Built for the community.', 'Hiệu suất hàng đầu. Sẵn sàng SEO. Tối ưu cho Vercel. Dành cho cộng đồng.');
