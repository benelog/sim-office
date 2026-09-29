-- TV at home: American news and tech news channels on YouTube, watched from the sofa.
-- Push the CREATE TABLE tv statement of db/schema.sql first. Channel ids checked on youtube.com (2026-09-29).
REPLACE INTO places (id, name, name_ko, zone, kind, note) VALUES
  ('home_tv', 'Sofa and TV', '소파와 TV', 'home', 'tv', 'Watch the news or tech videos with English captions.'),
  ('derek_tv', 'Sofa and TV', '소파와 TV', 'home_derek', 'tv', 'Watch the news or tech videos with English captions.'),
  ('priya_tv', 'Sofa and TV', '소파와 TV', 'home_priya', 'tv', 'Watch the news or tech videos with English captions.');

REPLACE INTO tv (id, name, kind, channel, live, note, note_ko, sort) VALUES
  ('abc', 'ABC News', 'news', 'UCBi2mrWuNuyYy4gbM6fU18Q', 1, 'ABC News Live streams around the clock.', 'ABC News Live는 24시간 생방송합니다.', 1),
  ('nbc', 'NBC News', 'news', 'UCeY0bbntWzzVIaj2z3QigXg', 1, 'NBC News NOW: live news all day.', 'NBC News NOW: 하루 종일 생방송 뉴스.', 2),
  ('cbs', 'CBS News', 'news', 'UC8p1vwvWtl6T73JiExfWs1g', 1, 'CBS News 24/7: national and local stories.', 'CBS News 24/7: 전국·지역 소식.', 3),
  ('pbs', 'PBS NewsHour', 'news', 'UC6ZFN9Tx6xh-skXCuRHCDpQ', 1, 'Public television''s evening news: calm and clear, good for listening practice.', '공영 방송 저녁 뉴스. 차분하고 또렷해서 듣기 연습에 좋아요.', 4),
  ('ap', 'Associated Press', 'news', 'UC52X5wxOL_s5yw0dQk7NtgA', 0, 'Short news clips from the AP newsroom.', 'AP 통신의 짧은 뉴스 영상.', 5),
  ('bloomberg', 'Bloomberg TV', 'news', 'UCIALMKvObZNtJ6AmdCLP7Lg', 1, 'Business and market news, live on weekdays.', '경제·시장 뉴스, 평일 생방송.', 6),
  ('cnbc', 'CNBC Television', 'news', 'UCrp_UI8XtuYfpiqluWLD7Lw', 0, 'Business news and interviews.', '경제 뉴스와 인터뷰.', 7),
  ('verge', 'The Verge', 'tech', 'UCddiUEpeqJcYeBxX1IVBKvQ', 0, 'Gadget reviews and tech news.', '기기 리뷰와 IT 소식.', 11),
  ('techcrunch', 'TechCrunch', 'tech', 'UCCjyq_K1Xwfg8Lndy7lKMpA', 0, 'Startups, funding and the tech industry.', '스타트업, 투자, IT 업계 소식.', 12),
  ('bloombergtech', 'Bloomberg Tech', 'tech', 'UCrM7B7SL_g1edFOnmj-SDKg', 0, 'The business of big tech.', '빅테크의 비즈니스 소식.', 13),
  ('cnet', 'CNET', 'tech', 'UCOmcA3f_RrH6b9NmcNa4tdg', 0, 'Phones, laptops and product launches.', '휴대폰, 노트북, 신제품 발표.', 14),
  ('fireship', 'Fireship', 'tech', 'UCsBjURrPoezykLs9EqgamOA', 0, 'Fast developer news (The Code Report): the words you hear at work.', '빠른 개발자 뉴스(The Code Report). 회사에서 듣는 말들.', 15),
  ('ltt', 'Linus Tech Tips', 'tech', 'UCXuqSBlHAE6Xw-yeJA0Tunw', 0, 'PC hardware and tech talk.', 'PC 하드웨어와 IT 이야기.', 16);
