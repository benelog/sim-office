-- Groceries keep for so many days (shelf_days; NULL keeps), a package gives so many portions (uses), and some
-- things cannot be eaten as they are (cook_only). Recipes turn what is in the kitchen into a meal.
-- Push the ALTER statements of db/schema.sql (items.shelf_days, uses, cook_only) and CREATE TABLE recipes first.
REPLACE INTO items (id, name, name_ko, kind, price, model, energy, place, note, shelf_days, uses, cook_only) VALUES
  ('apple', 'Apple', '사과', 'grocery', 0.89, 'apple', 8, 'market_shelves', 'sold by the piece', 10, 1, 0),
  ('avocado', 'Avocado', '아보카도', 'grocery', 1.5, 'avocado', 10, 'market_shelves', NULL, 4, 1, 0),
  ('bacon', 'Bacon (12 oz)', '베이컨(12온스)', 'grocery', 6.99, 'bacon', 15, 'market_shelves', NULL, 7, 3, 1),
  ('baguette', 'French baguette', '바게트', 'grocery', 2.99, 'loaf-baguette', 12, 'market_shelves', NULL, 2, 3, 0),
  ('bananas', 'Bananas (bunch of 5)', '바나나(5개 한 송이)', 'grocery', 1.45, 'banana', 10, 'market_shelves', NULL, 5, 5, 0),
  ('bread', 'Sandwich bread (loaf)', '식빵(한 봉지)', 'grocery', 3.49, 'loaf', 12, 'market_shelves', NULL, 6, 8, 0),
  ('broccoli', 'Broccoli crown', '브로콜리', 'grocery', 2.29, 'broccoli', 6, 'market_shelves', NULL, 6, 2, 1),
  ('candy_bar', 'Candy bar', '초코바', 'grocery', 1.79, 'candy-bar', 10, 'market_shelves', NULL, NULL, 1, 0),
  ('canned_soup', 'Canned chicken noodle soup', '치킨 누들 수프 통조림', 'grocery', 2.19, 'can', 30, 'market_shelves', 'a quick meal', NULL, 1, 0),
  ('carrots', 'Baby carrots (1 lb bag)', '베이비 당근(1파운드 봉지)', 'grocery', 1.79, 'carrot', 8, 'market_shelves', NULL, 14, 4, 0),
  ('cereal', 'Box of cereal', '시리얼 한 상자', 'grocery', 4.99, 'bowl-cereal', 15, 'market_shelves', NULL, NULL, 6, 0),
  ('cheese', 'Cheddar cheese (8 oz)', '체다 치즈(8온스)', 'grocery', 4.49, 'cheese', 12, 'market_shelves', NULL, 21, 4, 0),
  ('chips', 'Potato chips (family size)', '감자칩(대용량)', 'grocery', 4.29, 'bag', 12, 'market_shelves', NULL, NULL, 3, 0),
  ('cookies', 'Chocolate chip cookies', '초콜릿 칩 쿠키', 'grocery', 3.99, 'cookie', 11, 'market_shelves', NULL, NULL, 4, 0),
  ('deli_turkey', 'Sliced deli turkey (8 oz)', '칠면조 슬라이스(8온스)', 'grocery', 5.49, 'turkey', 14, 'market_shelves', NULL, 5, 4, 0),
  ('eggs', 'Eggs (dozen)', '달걀(12개)', 'grocery', 3.79, 'egg', 15, 'market_shelves', 'large, grade A', 21, 6, 1),
  ('frozen_pizza', 'Frozen pepperoni pizza', '냉동 페퍼로니 피자', 'grocery', 6.49, 'pizza-box', 40, 'market_shelves', 'a meal', 60, 2, 1),
  ('grapes', 'Red grapes (2 lb)', '적포도(2파운드)', 'grocery', 4.98, 'grapes', 10, 'market_shelves', NULL, 7, 4, 0),
  ('ground_beef', 'Ground beef (1 lb)', '다진 소고기(1파운드)', 'grocery', 5.99, 'meat-patty', 15, 'market_shelves', 'for burgers at home', 2, 2, 1),
  ('ice_cream', 'Ice cream (pint)', '아이스크림(파인트)', 'grocery', 5.49, 'ice-cream', 12, 'market_shelves', NULL, 60, 3, 0),
  ('milk', 'Milk (half gallon carton)', '우유(반 갤런 팩)', 'grocery', 3.29, 'carton', 8, 'market_shelves', '2%', 7, 4, 0),
  ('onion', 'Yellow onion', '양파', 'grocery', 0.99, 'onion', 3, 'market_shelves', 'for cooking', 30, 2, 1),
  ('oranges', 'Navel oranges (3)', '네이블 오렌지(3개)', 'grocery', 2.99, 'orange', 9, 'market_shelves', NULL, 14, 3, 0),
  ('peanut_butter', 'Peanut butter (jar)', '땅콩버터(병)', 'grocery', 3.49, 'peanut-butter', 12, 'market_shelves', NULL, NULL, 8, 0),
  ('soda_12pk', 'Soda (12-pack of cans)', '탄산음료(12캔 묶음)', 'grocery', 7.99, 'soda-can', 7, 'market_shelves', NULL, NULL, 12, 0),
  ('soda_bottle', 'Soda (2-liter bottle)', '탄산음료(2리터 병)', 'grocery', 2.29, 'soda-bottle', 6, 'market_shelves', NULL, NULL, 4, 0),
  ('strawberries', 'Strawberries (1 lb box)', '딸기(1파운드 상자)', 'grocery', 3.99, 'strawberry', 9, 'market_shelves', 'buy one, get one free this week', 4, 3, 0),
  ('tomatoes', 'Tomatoes (1 lb)', '토마토(1파운드)', 'grocery', 2.49, 'tomato', 5, 'market_shelves', NULL, 6, 3, 0);

REPLACE INTO recipes (id, name, name_ko, minutes, energy, ingredients, tool, steps, steps_ko, sort) VALUES
  ('scrambled_eggs', 'Scrambled eggs and toast', '스크램블드에그와 토스트', 10, 35, 'eggs,bread', 'stovetop', 'Crack two eggs into a bowl and whisk them with a pinch of salt. | Melt a little butter in a pan over medium heat. | Pour in the eggs and stir gently until they are just set. | Toast two slices of bread and serve.', '달걀 두 개를 그릇에 깨 넣고 소금을 조금 넣어 젓습니다. | 중불에서 팬에 버터를 조금 녹입니다. | 달걀을 붓고 막 익을 때까지 살살 젓습니다. | 빵 두 쪽을 구워 함께 냅니다. (crack: 깨다, whisk: 휘젓다, set: 굳다)', 1),
  ('bacon_eggs', 'Bacon, eggs and toast', '베이컨, 달걀, 토스트', 15, 48, 'bacon,eggs,bread', 'stovetop', 'Lay the bacon in a cold pan and cook it over medium heat until crisp. | Drain the bacon on a paper towel. | Fry two eggs in the same pan, sunny-side up or over easy. | Serve with buttered toast.', '차가운 팬에 베이컨을 깔고 중불에서 바삭해질 때까지 굽습니다. | 키친타월에 올려 기름을 뺍니다. | 같은 팬에 달걀 두 개를 부칩니다. 한쪽만 익히거나(sunny-side up) 살짝 뒤집습니다(over easy). | 버터 바른 토스트와 함께 냅니다.', 2),
  ('grilled_cheese', 'Grilled cheese sandwich', '그릴드 치즈 샌드위치', 10, 32, 'bread,cheese', 'stovetop', 'Butter one side of each slice of bread. | Put the cheese between the slices, buttered sides out. | Cook over medium-low heat until golden brown, then flip. | Cut it in half and eat it while it is hot.', '빵 한쪽 면에 버터를 바릅니다. | 버터 바른 면이 바깥으로 가게 하고 사이에 치즈를 넣습니다. | 중약불에서 노릇해질 때까지 굽고 뒤집습니다. | 반으로 잘라 뜨거울 때 먹습니다. (flip: 뒤집다)', 3),
  ('turkey_sandwich', 'Turkey and cheese sandwich', '칠면조 치즈 샌드위치', 8, 40, 'bread,deli_turkey,cheese,tomatoes', 'no cooking', 'Slice a tomato. | Spread mayo or mustard on two slices of bread. | Layer the turkey, the cheese and the tomato. | Cut the sandwich diagonally.', '토마토를 얇게 썹니다. | 빵 두 쪽에 마요네즈나 머스터드를 바릅니다. | 칠면조, 치즈, 토마토를 차례로 올립니다. | 샌드위치를 대각선으로 자릅니다. (spread: 바르다, layer: 겹겹이 올리다)', 4),
  ('peanut_butter_toast', 'Peanut butter and banana toast', '땅콩버터 바나나 토스트', 5, 30, 'bread,peanut_butter,bananas', 'toaster', 'Toast two slices of bread. | Spread peanut butter on the toast. | Peel a banana, slice it and put the slices on top.', '빵 두 쪽을 굽습니다. | 토스트에 땅콩버터를 바릅니다. | 바나나 껍질을 벗기고 썰어서 위에 올립니다. (peel: 껍질을 벗기다)', 5),
  ('cereal_bowl', 'Bowl of cereal', '시리얼 한 그릇', 5, 24, 'cereal,milk', 'no cooking', 'Pour the cereal into a bowl. | Add cold milk. | Eat it before it gets soggy.', '그릇에 시리얼을 붓습니다. | 차가운 우유를 넣습니다. | 눅눅해지기 전에 먹습니다. (soggy: 눅눅한)', 6);

REPLACE INTO recipes (id, name, name_ko, minutes, energy, ingredients, tool, steps, steps_ko, sort) VALUES
  ('avocado_toast', 'Avocado toast with a fried egg', '달걀 프라이를 올린 아보카도 토스트', 12, 38, 'avocado,bread,eggs', 'stovetop', 'Cut the avocado in half, take out the pit and scoop it into a bowl. | Mash it with a fork and season with salt and pepper. | Spread it on toast. | Top it with a fried egg.', '아보카도를 반으로 갈라 씨를 빼고 그릇에 퍼 담습니다. | 포크로 으깨고 소금과 후추로 간을 합니다. | 토스트에 바릅니다. | 달걀 프라이를 올립니다. (pit: 씨, mash: 으깨다, season: 간을 하다)', 7),
  ('veggie_omelet', 'Veggie omelet', '채소 오믈렛', 15, 42, 'eggs,cheese,onion,broccoli', 'stovetop', 'Chop the onion and the broccoli into small pieces. | Saute them for a few minutes until soft. | Pour in the beaten eggs and let them set. | Sprinkle the cheese on top and fold the omelet in half.', '양파와 브로콜리를 잘게 썹니다. | 부드러워질 때까지 몇 분 볶습니다. | 풀어 둔 달걀을 붓고 익힙니다. | 치즈를 뿌리고 오믈렛을 반으로 접습니다. (chop: 썰다, saute: 볶다, sprinkle: 뿌리다, fold: 접다)', 8),
  ('cheeseburger', 'Homemade cheeseburger', '집에서 만든 치즈버거', 25, 55, 'ground_beef,bread,cheese,onion,tomatoes', 'stovetop', 'Shape the ground beef into a patty and season both sides. | Cook it for four minutes on each side. | Put a slice of cheese on top and let it melt. | Build the burger with sliced onion and tomato.', '다진 소고기를 패티 모양으로 빚고 양면에 간을 합니다. | 한 면에 4분씩 굽습니다. | 치즈 한 장을 올려 녹입니다. | 썬 양파와 토마토를 넣어 버거를 만듭니다. (shape: 모양을 빚다, melt: 녹다)', 9),
  ('beef_skillet', 'Beef and vegetable skillet', '소고기 채소 볶음', 30, 58, 'ground_beef,onion,carrots,broccoli,tomatoes', 'stovetop', 'Brown the ground beef in a large skillet and drain the fat. | Add the chopped onion and carrots and cook for five minutes. | Stir in the broccoli and the diced tomatoes. | Cover and simmer for ten minutes.', '큰 프라이팬에 다진 소고기를 갈색이 나게 볶고 기름을 따라 냅니다. | 썬 양파와 당근을 넣고 5분 익힙니다. | 브로콜리와 깍둑썬 토마토를 넣고 섞습니다. | 뚜껑을 덮고 10분 동안 약불에 끓입니다. (brown: 갈색이 나게 익히다, simmer: 약불에 끓이다)', 10),
  ('baked_pizza', 'Frozen pizza, baked', '오븐에 구운 냉동 피자', 20, 40, 'frozen_pizza', 'oven', 'Preheat the oven to 425 degrees. | Take the pizza out of the box and remove the plastic wrap. | Bake it on the middle rack for 15 minutes. | Let it cool for a minute and cut it into slices.', '오븐을 화씨 425도(섭씨 약 220도)로 예열합니다. | 피자를 상자에서 꺼내고 비닐을 벗깁니다. | 가운데 칸에서 15분 굽습니다. | 1분 식힌 뒤 조각으로 자릅니다. (preheat: 예열하다, rack: 오븐 선반)', 11),
  ('fruit_salad', 'Fruit salad', '과일 샐러드', 10, 30, 'strawberries,grapes,bananas,oranges', 'no cooking', 'Rinse the strawberries and the grapes. | Peel the orange and the banana. | Cut everything into bite-size pieces. | Toss the fruit together in a bowl.', '딸기와 포도를 헹굽니다. | 오렌지와 바나나의 껍질을 벗깁니다. | 모두 한입 크기로 자릅니다. | 그릇에 담아 가볍게 섞습니다. (rinse: 헹구다, bite-size: 한입 크기, toss: 가볍게 섞다)', 12);
