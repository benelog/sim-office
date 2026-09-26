/* Game data for all 27 chapters. Written independently of any published English translation;
   the reader text is the site's own translation from the French (text/the-little-prince.txt).
   Quoted lines are kept to a few words.
   Fields: situation/prompt/hints (English) with *Ko Korean help; answers = keyword groups for free typing
   ({ all: [...] } every keyword required, { any: [...] } at least one); model = example answer;
   distractors = three wrong options for multiple-choice mode; reply = what happens after a good answer. */
window.LP_ROLES = {
  pilot: { en: 'You are the pilot. ', ko: '당신은 조종사입니다. ' },
  prince: { en: 'You are the little prince. ', ko: '당신은 어린 왕자입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'The Hat That Was Not a Hat', ko: '모자가 아니었던 그림',
    summary: 'A six-year-old artist gives up drawing because of the grown-ups, and becomes a pilot instead.',
    summaryKo: '여섯 살의 화가 지망생이 어른들 때문에 붓을 놓고 조종사가 됩니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'You are six years old. You proudly show the grown-ups your drawing number 1 and ask if it scares them. They only see a hat.',
        situationKo: '당신은 여섯 살입니다. 자랑스럽게 "그림 1호"를 어른들에게 보여 주며 무섭지 않으냐고 묻습니다. 어른들 눈에는 모자로만 보입니다.',
        speaker: 'A grown-up', line: 'Why would a hat be scary?',
        prompt: 'Explain what the drawing really shows. (Which animal swallowed what?)',
        promptKo: '그림이 진짜 무엇인지 설명해 보세요. (어떤 동물이 무엇을 삼켰나요?)',
        answers: [{ all: ['boa', 'elephant'] }, { all: ['snake', 'elephant'] }],
        model: 'It is a boa constrictor digesting an elephant.',
        distractors: ['It is a hat for a very large head.', 'It is a mountain with a cave inside.', 'It is a sheep sleeping in a box.'],
        hints: ['A boa constrictor is digesting an elephant.', 'Key words: boa, elephant'],
        hintsKo: ['보아뱀(boa constrictor)이 코끼리(elephant)를 소화시키는 중입니다.', '핵심 단어: boa, elephant'],
        reply: { speaker: 'A grown-up', line: 'Forget the boa constrictors, from the outside or from the inside. Go and learn your geography.' }
      },
      {
        role: 'pilot',
        situation: 'The grown-ups did not understand, so at six you gave up your wonderful career as a painter. Years later, a stranger asks about your job.',
        situationKo: '어른들이 알아주지 않아 여섯 살에 멋진 화가의 꿈을 접었습니다. 세월이 흘러 누군가 당신의 직업을 묻습니다.',
        speaker: 'A stranger', line: 'So, what did you become instead of a painter?',
        prompt: 'Say what you learned to do and what you became.',
        promptKo: '당신이 무엇을 배웠고, 어떤 직업을 갖게 되었는지 말해 보세요.',
        answers: [{ any: ['pilot', 'fly', 'flying', 'airplane', 'airplanes', 'plane', 'planes', 'aviator'] }],
        model: 'I learned to fly airplanes. I became a pilot.',
        distractors: ['I became a geographer and never left my desk.', 'I learned to count stars and became a businessman.', 'I became a teacher of grammar and arithmetic.'],
        hints: ['A job in the sky.', 'Key words: pilot or fly'],
        hintsKo: ['하늘을 나는 직업입니다.', '핵심 단어: pilot 또는 fly'],
        reply: { speaker: 'Narrator', line: 'I have flown a little bit everywhere in the world, and geography really did come in handy.' }
      }
    ]
  },
  {
    num: 2, title: 'Draw Me a Sheep', ko: '양 한 마리만 그려 줘',
    summary: 'A pilot crash-lands in the Sahara, and a small voice appears beside him.',
    summaryKo: '사하라 사막에 불시착한 조종사 앞에 작은 목소리가 나타납니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'Your plane has broken down in the Sahara, a thousand miles from anyone. You sleep on the sand, and at daybreak a funny little voice wakes you.',
        situationKo: '비행기가 사람 사는 곳에서 천 마일이나 떨어진 사하라 사막에 불시착했습니다. 모래 위에서 잠이 들었는데, 동틀 무렵 이상한 작은 목소리에 잠이 깹니다.',
        speaker: 'A small voice', line: 'Please… draw me a sheep!',
        prompt: 'You jump up and rub your eyes. What do you ask the child?',
        promptKo: '깜짝 놀라 눈을 비비며 아이에게 무엇이라고 묻겠습니까?',
        answers: [{ all: ['what', 'doing'] }, { all: ['who', 'are', 'you'] }, { all: ['where', 'come', 'from'] }, { all: ['what', 'are', 'you'] }, { all: ['where', 'are', 'you', 'from'] }],
        model: 'But what are you doing here?',
        distractors: ['Would you like to buy an airplane?', 'Please be quiet, I am trying to sleep.', 'Have you seen my sheep anywhere?'],
        hints: ['Ask what a child is doing in the middle of the desert.', 'Example: "What are you doing here?" or "Who are you?"'],
        hintsKo: ['사람 하나 없는 사막 한가운데서 아이가 무엇을 하고 있는지 물어보세요.', '예: "What are you doing here?" 또는 "Who are you?"'],
        reply: { speaker: 'The little prince', line: '(very softly, as if it were something serious) Please… draw me a sheep…' }
      },
      {
        role: 'pilot',
        situation: 'You have drawn three sheep and he turned them all down: one was sick, one was a ram with horns, one was too old. Running out of patience, you scribble a box.',
        situationKo: '양을 세 번 그렸지만 모두 퇴짜를 맞았습니다. 하나는 병들었고, 하나는 뿔 달린 숫양이고, 하나는 너무 늙었다고 합니다. 참다못한 당신은 상자 하나를 쓱쓱 그립니다.',
        speaker: 'The little prince', line: '(looks at the box, puzzled)',
        prompt: 'Explain what this drawing is, and where the sheep is.',
        promptKo: '이 그림이 무엇인지, 양이 어디에 있는지 설명해 보세요.',
        answers: [{ all: ['box'], any: ['inside', 'in', 'sheep'] }, { all: ['inside'] }],
        model: 'This is the box. The sheep you want is inside.',
        distractors: ['This is a hat. Grown-ups like hats.', 'The sheep ran away, so I drew the desert.', 'This is an elephant that swallowed a boa constrictor.'],
        hints: ['The sheep is inside the box.', 'Key words: box, inside'],
        hintsKo: ['양은 상자(box) 안(inside)에 있습니다.', '핵심 단어: box, inside'],
        reply: { speaker: 'The little prince', line: 'That\'s exactly how I wanted it! … Look! He\'s fallen asleep…' }
      }
    ]
  },
  {
    num: 3, title: 'From Another Planet', ko: '다른 별에서 온 아이',
    summary: 'Little by little, it becomes clear where the little prince came from.',
    summaryKo: '어린 왕자가 어디에서 왔는지 조금씩 드러납니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The little prince asks lots of questions but never seems to hear yours. Now he points at your machine.',
        situationKo: '어린 왕자는 이것저것 묻기만 하고 당신의 질문은 들은 척도 하지 않습니다. 이번에는 비행기를 가리킵니다.',
        speaker: 'The little prince', line: 'What is that thing over there?',
        prompt: 'Tell him what it is and what it does.',
        promptKo: '저 물건이 무엇인지, 무엇을 하는 물건인지 답해 보세요.',
        answers: [{ any: ['airplane', 'plane', 'aeroplane'] }, { all: ['it', 'flies'] }, { all: ['fly'] }],
        model: 'It\'s not a thing. It flies. It\'s an airplane. It\'s my plane.',
        distractors: ['That is a box. A sheep lives inside it.', 'That is a well. It gives water.', 'That is a volcano. I sweep it every week.'],
        hints: ['A machine that flies.', 'Key words: airplane or fly'],
        hintsKo: ['하늘을 나는(fly) 기계입니다.', '핵심 단어: airplane 또는 fly'],
        reply: { speaker: 'The little prince', line: 'What! You fell out of the sky!' }
      },
      {
        role: 'pilot',
        situation: 'He bursts out laughing when you say you fell from the sky, as if he came from there too. You catch a glimmer of light in the mystery.',
        situationKo: '어린 왕자는 당신이 하늘에서 떨어졌다는 말에 웃음을 터뜨리더니, 자기도 하늘에서 왔다는 듯 말합니다. 수수께끼에 한 줄기 빛이 비칩니다.',
        speaker: 'The little prince', line: 'So you come from the sky too! Which planet are you from?',
        prompt: 'Now it is your turn to ask. Ask whether he comes from another planet.',
        promptKo: '이번에는 당신이 물어볼 차례입니다. 어린 왕자가 다른 별에서 왔는지 물어보세요.',
        answers: [{ all: ['planet'], any: ['another', 'other', 'come', 'from', 'which', 'what'] }, { all: ['where', 'from'] }],
        model: 'So you come from another planet?',
        distractors: ['Do you want to see my airplane?', 'Is your sheep hungry?', 'How old are you, and how much does your father earn?'],
        hints: ['Ask: "Do you come from another planet?"', 'Key word: planet'],
        hintsKo: ['"다른 행성(another planet)에서 왔니?"라고 물어보세요.', '핵심 단어: planet'],
        reply: { speaker: 'The little prince', line: '(does not answer, and nods at the airplane) On that thing, you can\'t have come from very far…' }
      }
    ]
  },
  {
    num: 4, title: 'Asteroid B-612', ko: '소행성 B-612',
    summary: 'The little prince\'s planet is hardly bigger than a house. Grown-ups only love numbers.',
    summaryKo: '어린 왕자의 별은 집 한 채만 한 크기입니다. 어른들은 숫자만 좋아합니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The little prince\'s home is hardly bigger than a house. Grown-ups only believe you when you give them a number, so you decide to name it the way astronomers do.',
        situationKo: '어린 왕자의 별은 집 한 채보다 조금 큰 정도입니다. 어른들은 숫자를 대야만 믿어 주기에, 당신은 천문학자들처럼 그 별의 번호를 밝히기로 합니다.',
        speaker: 'A grown-up', line: 'A planet? What is its number?',
        prompt: 'Give the name (number) of the asteroid the little prince came from.',
        promptKo: '어린 왕자가 온 소행성의 이름(번호)을 말해 보세요.',
        answers: [{ any: ['b 612', 'b612', '612'] }],
        model: 'He comes from Asteroid B-612.',
        distractors: ['He comes from Asteroid 3251.', 'He comes from the planet Earth.', 'His planet has no number, only a flower.'],
        hints: ['A letter B and a three-digit number.', 'Key word: B-612'],
        hintsKo: ['알파벳 B와 세 자리 숫자로 된 이름입니다.', '핵심 단어: B-612'],
        reply: { speaker: 'A grown-up', line: 'Ah, B-612! Then it must be a real planet.' }
      },
      {
        role: 'pilot',
        situation: 'When you tell grown-ups about a new friend, they never ask what his voice sounds like or which games he likes best. They ask only this.',
        situationKo: '어른들은 새 친구가 생겼다고 하면 목소리가 어떤지, 무슨 놀이를 가장 좋아하는지는 묻지 않습니다. 대신 이런 것만 묻습니다.',
        speaker: 'A grown-up', line: 'How old is he? How many brothers does he have? How much money does his father make?',
        prompt: 'What one word covers all the things grown-ups love? "Grown-ups love ______."',
        promptKo: '어른들이 좋아하는 이런 것들을 한 단어로 부르면? "Grown-ups love ______."',
        answers: [{ any: ['figures', 'numbers', 'number', 'figure'] }],
        model: 'Grown-ups love numbers.',
        distractors: ['Grown-ups love sunsets.', 'Grown-ups love drawings of boa constrictors.', 'Grown-ups love butterflies.'],
        hints: ['Age, brothers, money… they are all numbers.', 'Key word: numbers'],
        hintsKo: ['나이, 형제 수, 돈… 모두 숫자입니다.', '핵심 단어: numbers'],
        reply: { speaker: 'Narrator', line: 'That\'s how they are. You mustn\'t hold it against them.' }
      }
    ]
  },
  {
    num: 5, title: 'The Baobabs', ko: '바오밥나무',
    summary: 'Do sheep eat baobabs? On a tiny planet, baobabs are a disaster.',
    summaryKo: '양이 바오밥나무를 먹을까요? 작은 별에서 바오밥은 재앙입니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'On the third day, the little prince suddenly asks you something, as if seized by a serious doubt.',
        situationKo: '셋째 날, 어린 왕자가 무언가 심각한 의문이 든 듯 갑자기 묻습니다.',
        speaker: 'The little prince', line: 'Sheep eat bushes, don\'t they? So that means they eat baobabs too?',
        prompt: 'Explain that baobabs are not bushes but enormous trees.',
        promptKo: '바오밥나무가 덤불이 아니라 얼마나 큰 나무인지 설명해 보세요.',
        answers: [{ all: ['baobab'], any: ['big', 'huge', 'large', 'tall', 'giant', 'enormous', 'tree', 'trees', 'castle', 'castles', 'church', 'churches'] }, { all: ['not', 'bushes'] }, { all: ['not', 'little'] }],
        model: 'Baobabs are not bushes. They are trees as big as churches.',
        distractors: ['Yes, baobabs are tiny bushes, so sheep love them.', 'Baobabs are flowers that live only one morning.', 'Sheep do not eat anything at all.'],
        hints: ['A baobab is a tree as big as a church.', 'Key words: baobab + big/tree/church'],
        hintsKo: ['바오밥(baobab)은 교회(church)만큼 큰(big) 나무(tree)입니다.', '핵심 단어: baobab + big/tree/church'],
        reply: { speaker: 'The little prince', line: 'Before they grow big, baobabs start out small.' }
      },
      {
        role: 'pilot',
        situation: 'The soil of his planet is full of terrible baobab seeds. When the sprouts are young they look like rosebushes, so he has a rule for them.',
        situationKo: '어린 왕자의 별 흙에는 무서운 바오밥 씨앗이 가득합니다. 어린 싹일 때는 장미와 닮았기 때문에, 그는 규칙을 하나 지키고 있습니다.',
        speaker: 'The little prince', line: 'It\'s a question of discipline. Every morning you tidy the planet. And the baobabs?',
        prompt: 'Say what must be done with the baobab sprouts every morning.',
        promptKo: '아침마다 바오밥 새싹을 어떻게 해야 하는지 말해 보세요.',
        answers: [{ any: ['pull', 'pull up', 'pull out', 'uproot', 'root out', 'remove', 'dig', 'pluck', 'tear', 'weed'] }],
        model: 'You have to pull up the baobabs as soon as you can tell them apart from the rosebushes.',
        distractors: ['You must water the baobabs so they grow faster.', 'You must count the baobabs and write the number down.', 'You must put the baobabs under a glass globe.'],
        hints: ['Pull them up by the roots.', 'Key words: pull or uproot'],
        hintsKo: ['뿌리째 뽑아(pull up / uproot) 버려야 합니다.', '핵심 단어: pull 또는 uproot'],
        reply: { speaker: 'The little prince', line: 'It is very boring work, but very easy.' }
      }
    ]
  },
  {
    num: 6, title: 'Forty-Four Sunsets', ko: '마흔네 번의 해넘이',
    summary: 'For a long time, the little prince\'s only amusement has been watching the sun go down.',
    summaryKo: '오랫동안 어린 왕자의 유일한 즐거움은 해 지는 풍경이었습니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'On the morning of the fourth day, the little prince says:',
        situationKo: '넷째 날 아침, 어린 왕자가 당신에게 말합니다.',
        speaker: 'The little prince', line: 'I really like sunsets. Let\'s go and watch a sunset…',
        prompt: 'It is morning. Tell him what you have to wait for to see a sunset.',
        promptKo: '지금은 아침입니다. 해넘이를 보려면 무엇을 기다려야 하는지 말해 보세요.',
        answers: [{ all: ['wait'] }, { all: ['sun'], any: ['set', 'sets', 'goes down', 'go down', 'sunset', 'evening'] }, { any: ['evening', 'later'] }],
        model: 'But we have to wait for the sun to set.',
        distractors: ['But first I must repair my airplane.', 'But I would rather stay in the shade.', 'But I do not like sunsets at all.'],
        hints: ['We have to wait until the sun goes down.', 'Key words: wait, or sun set'],
        hintsKo: ['기다려야(wait) 합니다. 해(sun)가 질(set) 때까지요.', '핵심 단어: wait 또는 sun set'],
        reply: { speaker: 'The little prince', line: 'Wait for what? … (laughs at himself) I keep thinking I\'m at home!' }
      },
      {
        role: 'pilot',
        situation: 'On his tiny planet he only has to move his chair a few steps to see the sun set again. One day he watched it forty-four times. A little later he adds:',
        situationKo: '어린 왕자의 작은 별에서는 의자를 몇 걸음만 옮기면 언제든 해넘이를 볼 수 있습니다. 어느 날은 마흔네 번이나 보았다고 합니다. 조금 뒤 그가 덧붙입니다.',
        speaker: 'The little prince', line: 'You know… when you are very sad, you love sunsets…',
        prompt: 'Ask whether he was very sad on the day he watched forty-four sunsets.',
        promptKo: '해넘이를 마흔네 번 본 그날, 몹시 슬펐던 것인지 물어보세요.',
        answers: [{ all: ['sad'] }, { all: ['unhappy'] }],
        model: 'So on the day you watched forty-four sunsets, were you very sad?',
        distractors: ['So on the day you watched forty-four sunsets, were you hungry?', 'Did you count the sunsets in a notebook?', 'Was the chair comfortable?'],
        hints: ['Ask: "Were you very sad that day?"', 'Key word: sad'],
        hintsKo: ['"그날 몹시 슬펐니(sad)?"라고 물어보세요.', '핵심 단어: sad'],
        reply: { speaker: 'The little prince', line: '(does not answer)' }
      }
    ]
  },
  {
    num: 7, title: 'What Are Thorns For?', ko: '가시는 무엇에 쓰나요',
    summary: 'A pilot busy with his engine and a prince worried about his flower have their first quarrel.',
    summaryKo: '엔진 수리에 바쁜 조종사와 꽃을 걱정하는 어린 왕자가 처음으로 다툽니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The fifth day. You are fighting with a bolt in your engine that is stuck too tight. Out of nowhere, the little prince asks:',
        situationKo: '다섯째 날. 당신은 너무 꽉 조인 엔진 볼트와 씨름 중입니다. 어린 왕자가 불쑥 묻습니다.',
        speaker: 'The little prince', line: 'A sheep, if it eats bushes, does it eat flowers too?',
        prompt: 'Answer without thinking: a sheep eats whatever it finds.',
        promptKo: '건성으로 대답해 보세요. 양은 눈에 띄는 것은 무엇이든 먹는다고요.',
        answers: [{ all: ['anything'] }, { all: ['everything'] }, { all: ['yes'], any: ['flower', 'flowers', 'eat', 'eats'] }, { all: ['whatever'] }],
        model: 'A sheep eats everything it finds.',
        distractors: ['A sheep only eats baobabs.', 'A sheep never eats. It only sleeps in its box.', 'A sheep eats bolts and engines.'],
        hints: ['"A sheep eats everything it finds."', 'Key words: everything or anything'],
        hintsKo: ['"양은 뭐든지(everything) 먹어."', '핵심 단어: everything 또는 anything'],
        reply: { speaker: 'The little prince', line: 'Even flowers that have thorns? … Then the thorns, what are they for?' }
      },
      {
        role: 'pilot',
        situation: 'You snap that thorns are good for nothing and that you are busy with serious things. He is furious: there is one flower like his in the world, and a sheep could eat her in one bite. You drop your tools.',
        situationKo: '가시는 아무 쓸모도 없고 자기는 중요한 일로 바쁘다고 쏘아붙이자, 어린 왕자는 크게 화를 냅니다. 세상에 하나뿐인 자기 꽃을 양이 한입에 먹어 버릴 수도 있다고요. 당신은 연장을 내려놓습니다.',
        speaker: 'The little prince', line: '(bursting into sobs) And that isn\'t important!',
        prompt: 'Comfort him: the flower is not in danger, and you will draw something for the sheep.',
        promptKo: '꽃은 위험하지 않다고, 양에게 무엇을 그려 주겠다고 달래 보세요.',
        answers: [{ any: ['muzzle', 'fence', 'railing', 'protect', 'protection', 'safe', 'not in danger', 'no danger', 'armor', 'armour'] }],
        model: 'The flower you love is not in danger. I\'ll draw a muzzle for your sheep.',
        distractors: ['Stop crying. Flowers are not important.', 'I will draw you a bigger sheep with sharper teeth.', 'Let me finish the engine first, then we can talk.'],
        hints: ['Offer a muzzle for the sheep, or a suit of armor for the flower.', 'Key words: muzzle, armor, protect, danger'],
        hintsKo: ['양에게 입마개(muzzle)를, 꽃에는 갑옷(armor)을 그려 주겠다고 하세요.', '핵심 단어: muzzle, armor, protect, danger'],
        reply: { speaker: 'Narrator', line: '(You hold him and rock him, not knowing what else to say.) The land of tears is such a mysterious place!' }
      }
    ]
  },
  {
    num: 8, title: 'The Rose', ko: '장미',
    summary: 'A flower blooms one morning on the little planet: proud and difficult, but beautiful.',
    summaryKo: '어느 날 아침 별에 핀 꽃은 까다롭고 자존심이 셌지만, 아름다웠습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'Now you are the little prince. The bud you have watched for days opens exactly at sunrise. The flower yawns and speaks.',
        situationKo: '이제 당신은 어린 왕자입니다. 며칠 동안 지켜본 꽃봉오리가 해가 뜨는 바로 그때 활짝 피었습니다. 꽃이 하품을 하며 말합니다.',
        speaker: 'The rose', line: 'Oh! I\'ve only just woken up… I\'m so sorry…',
        prompt: 'Say how beautiful she is, the moment you first see her.',
        promptKo: '꽃을 처음 본 감탄을 말해 보세요. 얼마나 아름다운지!',
        answers: [{ any: ['beautiful', 'pretty', 'lovely', 'gorgeous'] }],
        model: 'How beautiful you are!',
        distractors: ['Oh! How late you are!', 'Are you a baobab?', 'Please go back to sleep.'],
        hints: ['"How beautiful you are!"', 'Key word: beautiful'],
        hintsKo: ['"정말 아름답구나(beautiful)!"', '핵심 단어: beautiful'],
        reply: { speaker: 'The rose', line: 'Aren\'t I? And I was born at the same moment as the sun…' }
      },
      {
        role: 'prince',
        situation: 'Before long her touchy pride starts to wear you down. She boasts about tigers, then says she cannot stand drafts and wants to be covered in the evening.',
        situationKo: '꽃은 곧 까다로운 자존심으로 당신을 힘들게 합니다. 호랑이 따위는 무섭지 않다고 큰소리치더니, 바람은 질색이라며 저녁이 되면 무언가를 씌워 달라고 합니다.',
        speaker: 'The rose', line: 'I can\'t stand drafts. You wouldn\'t have a screen, would you?',
        prompt: 'Tell her what you will put over her at night. (Something made of glass.)',
        promptKo: '꽃에게 무엇을 씌워 주겠다고 답해 보세요. (유리로 된 것)',
        answers: [{ any: ['glass', 'globe', 'screen', 'cover', 'dome'] }],
        model: 'I will put you under a glass globe at night.',
        distractors: ['I will move you next to the volcano to keep you warm.', 'I will ask the sheep to sleep beside you.', 'There are no drafts on this planet.'],
        hints: ['A glass globe.', 'Key words: glass, globe, screen'],
        hintsKo: ['유리 덮개(glass globe)를 씌워 줍니다.', '핵심 단어: glass, globe, screen'],
        reply: { speaker: 'Narrator', line: 'Later he would say: "I should have judged her by what she did, not by what she said."' }
      }
    ]
  },
  {
    num: 9, title: 'Leaving the Planet', ko: '별을 떠나며',
    summary: 'The little prince sweeps out his volcanoes and says goodbye. At last the flower tells the truth.',
    summaryKo: '어린 왕자는 화산을 청소하고 꽃과 작별합니다. 꽃은 마침내 진심을 말합니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'On the morning you leave, you put your planet in good order. You have two active volcanoes and one extinct one. You never know!',
        situationKo: '떠나는 날 아침, 당신은 별을 말끔히 정돈합니다. 활화산 둘과 불 꺼진 화산 하나가 있습니다. 혹시 모르니까요!',
        speaker: 'Narrator', line: 'What do you do with the volcanoes before you leave?',
        prompt: 'Say how you take care of the volcanoes.',
        promptKo: '화산들을 어떻게 손질하는지 말해 보세요.',
        answers: [{ any: ['clean', 'cleaned', 'sweep', 'swept', 'clear', 'cleared'] }],
        model: 'I sweep out my volcanoes carefully, even the extinct one.',
        distractors: ['I fill the volcanoes with water.', 'I plant baobabs in the volcanoes.', 'I sell the volcanoes to the businessman.'],
        hints: ['You sweep them out. Well-swept volcanoes burn gently and steadily.', 'Key words: sweep or clean'],
        hintsKo: ['깨끗이 쓸어(sweep) 냅니다. 잘 청소한 화산은 폭발하지 않고 얌전히 타오르니까요.', '핵심 단어: sweep 또는 clean'],
        reply: { speaker: 'Narrator', line: 'Volcanic eruptions are like chimney fires. Here on Earth we are far too small to sweep ours.' }
      },
      {
        role: 'prince',
        situation: 'When you go to put the glass globe over her, the flower stops you. She coughs, and then admits that she loves you. Then she sends you off.',
        situationKo: '유리 덮개를 씌우려 하자 꽃이 말립니다. 기침을 하더니, 사실은 당신을 사랑한다고 털어놓습니다. 그리고 어서 가라고 합니다.',
        speaker: 'The rose', line: 'Don\'t hang around like this. You have decided to leave. Go away.',
        prompt: 'Say goodbye to the flower.',
        promptKo: '꽃에게 작별 인사를 하세요.',
        answers: [{ any: ['goodbye', 'good bye', 'farewell', 'adieu', 'bye'] }],
        model: 'Goodbye.',
        distractors: ['Good morning.', 'Draw me a sheep.', 'See you at lunch.'],
        hints: ['One word of farewell is enough.', 'Key word: goodbye'],
        hintsKo: ['작별 인사 한마디면 됩니다.', '핵심 단어: goodbye'],
        reply: { speaker: 'Narrator', line: '(She did not want him to see her cry. She was such a proud flower…)' }
      }
    ]
  },
  {
    num: 10, title: 'The King', ko: '왕',
    summary: 'On the first asteroid lives a king with no subjects. He gives only reasonable orders.',
    summaryKo: '첫 번째 별에는 신하 없는 왕이 살고 있습니다. 왕은 합리적인 명령만 내립니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The king of the first asteroid is thrilled to see you: at last, someone to rule! He says even the stars obey him. You miss your sunsets.',
        situationKo: '첫 번째 소행성의 왕은 당신을 보자마자 드디어 다스릴 신하가 왔다며 기뻐합니다. 별들조차 자기 명령을 따른다고 합니다. 당신은 해넘이가 그립습니다.',
        speaker: 'The king', line: 'Ah! Here is a subject!',
        prompt: 'Ask the king to order the sun to set.',
        promptKo: '왕에게 해가 지도록 명령해 달라고 부탁해 보세요.',
        answers: [{ all: ['order', 'sun'] }, { all: ['command', 'sun'] }, { all: ['sunset'] }, { all: ['sun', 'set'] }],
        model: 'I would like to see a sunset. Please order the sun to set.',
        distractors: ['I would like to be king. Give me your crown!', 'Order the sheep to eat the baobabs!', 'Order the stars to count themselves!'],
        hints: ['"Please order the sun to set."', 'Key words: order + sun'],
        hintsKo: ['"해(sun)에게 지라고(set) 명령(order)해 주세요."', '핵심 단어: order + sun'],
        reply: { speaker: 'The king', line: 'You shall have your sunset. I will demand it… this evening, at about seven-forty!' }
      },
      {
        role: 'prince',
        situation: 'The king offers to make you his minister of justice. But there is nobody on this planet to judge. The king answers:',
        situationKo: '왕은 당신을 법무 대신으로 삼겠다고 합니다. 하지만 이 별에는 재판할 사람이 아무도 없습니다. 왕이 대답합니다.',
        speaker: 'The king', line: 'Then you shall judge yourself. That is the hardest thing of all.',
        prompt: 'Finish the king\'s thought: "It is much harder to judge ______ than to judge others."',
        promptKo: '왕의 말을 이어 보세요. "It is much harder to judge ______ than to judge others."',
        answers: [{ any: ['yourself', 'oneself', 'myself', 'ourselves', 'himself', 'herself', 'one self', 'your self'] }],
        model: 'It is much harder to judge yourself than to judge others.',
        distractors: ['It is much harder to judge a rat than to judge others.', 'It is much harder to judge the sun than to judge others.', 'It is much harder to judge a king than to judge others.'],
        hints: ['Not others, but your own self.', 'Key word: yourself'],
        hintsKo: ['남(others)이 아니라 자기 자신(yourself)을 심판하는 것이 더 어렵습니다.', '핵심 단어: yourself'],
        reply: { speaker: 'The king', line: 'If you manage to judge yourself well, then you are truly wise.' }
      }
    ]
  },
  {
    num: 11, title: 'The Vain Man', ko: '허영심 많은 사람',
    summary: 'The vain man on the second planet believes everyone admires him.',
    summaryKo: '두 번째 별의 허영심 많은 사람은 모두가 자기를 찬양한다고 믿습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The vain man on the second planet greets you as an admirer. He wears a funny hat, for bowing when people cheer. But first you must do something.',
        situationKo: '두 번째 별의 허영심 많은 사람은 당신을 보자마자 찬양하러 온 사람이라며 반깁니다. 사람들이 환호하면 인사할 때 쓰는 우스운 모자를 썼습니다. 그러려면 먼저 당신이 무언가를 해야 합니다.',
        speaker: 'The vain man', line: 'Clap your hands together.',
        prompt: 'Do as he says. What do you do?',
        promptKo: '시키는 대로 해 보세요. 무엇을 하겠습니까?',
        answers: [{ any: ['clap', 'claps', 'clapping', 'applaud'] }],
        model: 'I clap my hands.',
        distractors: ['I take off my scarf.', 'I sit down and yawn.', 'I draw him a sheep.'],
        hints: ['Clap.', 'Key word: clap'],
        hintsKo: ['손뼉을 칩니다(clap).', '핵심 단어: clap'],
        reply: { speaker: 'The vain man', line: '(lifts his hat and bows) Do you really admire me very much?' }
      },
      {
        role: 'prince',
        situation: 'To admire him, he explains, means to agree that he is the handsomest, the best-dressed, the richest and the cleverest man on the planet.',
        situationKo: '찬양한다는 것은 그가 이 별에서 가장 잘생기고, 옷을 가장 잘 입고, 가장 부자이고, 가장 똑똑한 사람이라고 인정하는 것이라고 합니다.',
        speaker: 'The vain man', line: 'Do me this favor. Admire me anyway!',
        prompt: 'Point out that he is the only man on his planet.',
        promptKo: '이 별에는 그 사람 혼자뿐이라는 점을 지적해 보세요.',
        answers: [{ all: ['only'], any: ['man', 'one', 'person', 'people', 'planet'] }, { all: ['alone'] }, { all: ['nobody', 'else'] }, { all: ['no one', 'else'] }],
        model: 'But you\'re all alone on your planet!',
        distractors: ['But you are the richest man on the Earth!', 'But your hat is too small!', 'But I have already clapped three times!'],
        hints: ['"But you are all alone here!"', 'Key words: alone / only'],
        hintsKo: ['"하지만 이 별에는 당신 혼자(alone)잖아요!"', '핵심 단어: alone / only'],
        reply: { speaker: 'Narrator', line: 'Grown-ups really are very odd, the little prince said to himself as he traveled on.' }
      }
    ]
  },
  {
    num: 12, title: 'The Drinker', ko: '술꾼',
    summary: 'The drinker on the third planet drinks to forget that he is ashamed of drinking.',
    summaryKo: '세 번째 별의 술꾼은 부끄러움을 잊으려고 마시고, 마시는 것이 부끄럽습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The third planet. A gloomy man sits without a word among rows of bottles, some empty and some full.',
        situationKo: '세 번째 별. 우울한 얼굴의 남자가 빈 병과 가득 찬 병을 잔뜩 늘어놓고 말없이 앉아 있습니다.',
        speaker: 'The drinker', line: 'I\'m drinking.',
        prompt: 'Ask him why he is drinking.',
        promptKo: '왜 마시는지 물어보세요.',
        answers: [{ all: ['why'] }, { all: ['what', 'for'] }],
        model: 'Why are you drinking?',
        distractors: ['What are you drinking?', 'May I have a bottle?', 'Where did you buy all these bottles?'],
        hints: ['Ask for the reason.', 'Key word: why'],
        hintsKo: ['이유(why)를 물어보세요.', '핵심 단어: why'],
        reply: { speaker: 'The drinker', line: 'To forget.' }
      },
      {
        role: 'prince',
        situation: 'He drinks to forget, he says. You start to feel sorry for him.',
        situationKo: '잊으려고 마신다고 합니다. 당신은 그가 안쓰러워지기 시작합니다.',
        speaker: 'The drinker', line: '(gloomily) To forget.',
        prompt: 'Ask what he wants to forget.',
        promptKo: '무엇을 잊고 싶은지 물어보세요.',
        answers: [{ all: ['forget'] }, { all: ['forgotten'] }],
        model: 'To forget what?',
        distractors: ['Remember me?', 'Remember what?', 'Drink what?'],
        hints: ['"To forget what?"', 'Key words: forget what'],
        hintsKo: ['"무엇(what)을 잊으려고(forget)?"', '핵심 단어: forget what'],
        reply: { speaker: 'The drinker', line: '(hanging his head) To forget that I\'m ashamed. … Ashamed of drinking!' }
      }
    ]
  },
  {
    num: 13, title: 'The Businessman', ko: '사업가',
    summary: 'The businessman on the fourth planet counts the stars and says he owns them, but he is not useful to them.',
    summaryKo: '네 번째 별의 사업가는 별을 세며 자기 것이라고 합니다. 그러나 별에게 아무 쓸모가 없습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The fourth planet. A man is adding up numbers so busily that he does not even raise his head.',
        situationKo: '네 번째 별. 남자는 고개도 들지 않고 바쁘게 숫자를 더하고 있습니다.',
        speaker: 'The businessman', line: 'Five hundred one million, six hundred twenty-two thousand, seven hundred thirty-one.',
        prompt: 'Ask him five hundred million of what.',
        promptKo: '그 오억 몇천만이 "무엇"인지 물어보세요.',
        answers: [{ all: ['what'] }, { all: ['of', 'what'] }, { all: ['million', 'what'] }],
        model: 'Five hundred million what?',
        distractors: ['Five hundred million is a lot of sheep.', 'Can you count faster, please?', 'Is that your telephone number?'],
        hints: ['"Five hundred million… what?"', 'Key word: what'],
        hintsKo: ['"오억 ... 무엇(what)이요?"', '핵심 단어: what'],
        reply: { speaker: 'The businessman', line: 'Little golden things that make lazy people daydream. Stars! But I am a serious man.' }
      },
      {
        role: 'prince',
        situation: 'The stars belong to him, the businessman says, because he was the first to think of owning them. He counts them and "puts them in the bank": he writes the number on a slip of paper and locks it in a drawer.',
        situationKo: '사업가는 별을 소유하겠다고 제일 먼저 생각했으니 별은 자기 것이라고 합니다. 별을 세어 "은행에 넣어 둔다"고요. 종이에 숫자를 적어 서랍에 넣고 잠근다는 뜻입니다.',
        speaker: 'The businessman', line: 'I own them. I count them and count them again. I am a serious man!',
        prompt: 'Ask what good it does him to own the stars, or what use he is to them.',
        promptKo: '별을 소유해서 무엇이 좋은지, 별에게 무슨 쓸모가 있는지 따져 보세요.',
        answers: [{ all: ['what', 'good'] }, { all: ['good'], any: ['own', 'owning'] }, { any: ['use', 'useful', 'useless'] }, { all: ['why'], any: ['own', 'need', 'want', 'keep'] }],
        model: 'But what good is it to you, owning the stars?',
        distractors: ['And how much do the stars cost each?', 'May I own a few stars as well?', 'Do the stars know that you own them?'],
        hints: ['"What good is it to you, owning them?"', 'Key words: own, good, use'],
        hintsKo: ['"별을 소유(own)해서 무슨 좋은 점(good)이 있나요?"', '핵심 단어: own, good, use'],
        reply: { speaker: 'The businessman', line: 'It makes me rich. And being rich lets me buy more stars, if anyone finds some.' }
      },
      {
        role: 'prince',
        situation: 'You own things too: a flower you water every day and three volcanoes you sweep out every week. What you do is useful to them.',
        situationKo: '당신도 소유한 것이 있습니다. 매일 물을 주는 꽃과 매주 청소하는 화산 셋. 당신은 그것들에게 쓸모가 있습니다.',
        speaker: 'The businessman', line: '(opens his mouth, but finds nothing to say)',
        prompt: 'Say what you own and take care of.',
        promptKo: '당신이 소유하고 돌보는 것을 말해 보세요.',
        answers: [{ any: ['flower', 'rose', 'volcano', 'volcanoes'] }],
        model: 'I own a flower, and I water her every day. I own three volcanoes, and I sweep them out every week.',
        distractors: ['I own a bank where I keep my papers.', 'I own a hundred sheep and a thousand boxes.', 'I own nothing, and I want nothing.'],
        hints: ['A flower and three volcanoes.', 'Key words: flower or volcano'],
        hintsKo: ['꽃(flower) 한 송이와 화산(volcanoes) 셋.', '핵심 단어: flower 또는 volcano'],
        reply: { speaker: 'The little prince', line: 'But you are not useful to the stars…' }
      }
    ]
  },
  {
    num: 14, title: 'The Lamplighter', ko: '가로등 켜는 사람',
    summary: 'The fifth planet is the smallest, but its lamplighter is the only grown-up who takes care of something other than himself.',
    summaryKo: '다섯 번째 별은 가장 작지만, 자기 아닌 것을 돌보는 유일한 어른이 삽니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The fifth planet is the smallest of all: one street lamp, one lamplighter, and nothing else. He greets you, puts out his lamp, and lights it again at once.',
        situationKo: '다섯 번째 별은 모든 별 가운데 가장 작습니다. 가로등 하나와 그것을 켜는 사람 하나뿐입니다. 남자는 인사를 하며 등을 끄더니, 곧 다시 켭니다.',
        speaker: 'The lamplighter', line: 'Good morning. … Good evening.',
        prompt: 'Ask why he just put out his lamp, or what his orders are.',
        promptKo: '왜 방금 등을 껐다가 다시 켰는지, 무슨 명령을 따르는 것인지 물어보세요.',
        answers: [{ all: ['why'] }, { any: ['orders', 'order', 'instructions'] }],
        model: 'Why did you just put out your lamp? What are the orders?',
        distractors: ['Can I borrow your lamp for the night?', 'Is it morning or evening on the Earth?', 'How much does a lamp like that cost?'],
        hints: ['Ask for the reason, or about the orders.', 'Key words: why / orders'],
        hintsKo: ['이유(why) 또는 명령(orders)에 대해 물어보세요.', '핵심 단어: why / orders'],
        reply: { speaker: 'The lamplighter', line: 'Those are the orders. There is nothing to understand. Orders are orders.' }
      },
      {
        role: 'prince',
        situation: 'Year after year his planet has spun faster, and now a whole day lasts one minute, so he never gets any rest. Yet the planet is so small that three strides take you all the way round.',
        situationKo: '해가 갈수록 별이 빨리 돌아, 이제 하루가 일 분밖에 되지 않습니다. 남자는 도무지 쉴 틈이 없습니다. 그런데 이 별은 세 걸음이면 한 바퀴를 돌 만큼 작습니다.',
        speaker: 'The lamplighter', line: 'I light it and put it out once every minute!',
        prompt: 'Tell him how he could stay in the sunshine all the time. (Slowly…)',
        promptKo: '항상 햇빛 속에 있으려면 어떻게 하면 되는지 알려 주세요. (천천히 …)',
        answers: [{ any: ['walk', 'walking', 'stride', 'strides', 'step', 'steps'] }, { all: ['slowly'] }, { all: ['follow', 'sun'] }],
        model: 'Walk slowly around your planet, and the day will last as long as you like.',
        distractors: ['Just break the lamp and go to bed.', 'Just close your eyes, and it will always be night.', 'Just ask the king to stop the planet.'],
        hints: ['Walk slowly, keeping up with the sun.', 'Key words: walk / slowly'],
        hintsKo: ['천천히(slowly) 걸어가면(walk) 됩니다.', '핵심 단어: walk / slowly'],
        reply: { speaker: 'The lamplighter', line: 'That doesn\'t do me much good. What I love most in life is sleeping.' }
      }
    ]
  },
  {
    num: 15, title: 'The Geographer', ko: '지리학자',
    summary: 'The scholar on the sixth planet never leaves his desk, and does not write down flowers because they are ephemeral.',
    summaryKo: '여섯 번째 별의 학자는 책상을 떠나지 않고, 꽃은 덧없어서 기록하지 않습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The sixth planet. An old gentleman who writes enormous books decides you are an explorer, opens his big register and sharpens his pencil.',
        situationKo: '여섯 번째 별. 커다란 책을 쓰는 노신사가 당신을 탐험가라고 여기고, 큰 장부를 펼쳐 연필을 깎습니다.',
        speaker: 'The geographer', line: 'You are an explorer! You shall describe your planet to me!',
        prompt: 'Tell him what is on your planet. (Volcanoes and a flower.)',
        promptKo: '당신의 별에 무엇이 있는지 말해 보세요. (화산과 꽃)',
        answers: [{ any: ['volcano', 'volcanoes'] }, { any: ['flower', 'rose'] }],
        model: 'I have three volcanoes. I also have a flower.',
        distractors: ['I have three oceans and a mountain.', 'I have a railway and a lamp.', 'I have five thousand roses in a garden.'],
        hints: ['Three volcanoes and one flower.', 'Key words: volcano / flower'],
        hintsKo: ['화산(volcanoes) 세 개와 꽃(flower) 한 송이.', '핵심 단어: volcano / flower'],
        reply: { speaker: 'The geographer', line: 'We do not write down flowers.' }
      },
      {
        role: 'prince',
        situation: 'Mountains and oceans go in his books, he says, because they last forever. Flowers do not, because flowers are "ephemeral".',
        situationKo: '지리학자는 산과 바다는 영원히 남으니까 책에 적지만, 꽃은 적지 않는다고 합니다. 꽃은 "덧없기(ephemeral)" 때문이라고요.',
        speaker: 'The geographer', line: 'Because flowers are ephemeral.',
        prompt: 'Ask what "ephemeral" means.',
        promptKo: '"ephemeral"이 무슨 뜻인지 물어보세요.',
        answers: [{ all: ['ephemeral'] }, { all: ['what', 'mean'] }, { all: ['what', 'means'] }],
        model: 'What does "ephemeral" mean?',
        distractors: ['Is geography more important than flowers?', 'Can I borrow your pencil?', 'Do you write down volcanoes that are extinct?'],
        hints: ['Ask for the meaning of the word you do not know.', 'Key words: ephemeral / mean'],
        hintsKo: ['모르는 단어의 뜻(mean)을 물어보세요.', '핵심 단어: ephemeral / mean'],
        reply: { speaker: 'The geographer', line: 'It means "in danger of soon disappearing."' }
      },
      {
        role: 'prince',
        situation: 'Your flower is in danger of soon disappearing, and she has only four thorns. For the first time you feel regret. But you take heart again.',
        situationKo: '당신의 꽃이 머지않아 사라질 위험에 놓여 있고, 가진 것이라곤 가시 네 개뿐입니다. 처음으로 후회가 밀려옵니다. 그래도 당신은 다시 용기를 냅니다.',
        speaker: 'The geographer', line: '(waits, pencil in hand)',
        prompt: 'Ask him which planet he would advise you to visit next.',
        promptKo: '다음에 어느 별을 가 보면 좋을지 추천해 달라고 물어보세요.',
        answers: [{ any: ['advise', 'recommend', 'suggest'] }, { all: ['where'], any: ['go', 'visit', 'next', 'should'] }, { any: ['which planet', 'what planet', 'what place', 'which place'] }],
        model: 'Where would you advise me to go and visit?',
        distractors: ['Which of your books is the heaviest?', 'Would you like to come and see my planet?', 'Could you write my flower in your book anyway?'],
        hints: ['Ask where to go, or for a recommendation.', 'Key words: advise / visit / which planet'],
        hintsKo: ['어디로(where) 가면 좋을지, 추천(advise/recommend)을 부탁하세요.', '핵심 단어: advise / visit / which planet'],
        reply: { speaker: 'The geographer', line: 'The planet Earth. It has a good reputation…' }
      }
    ]
  },
  {
    num: 16, title: 'The Earth', ko: '지구',
    summary: 'The seventh planet: the Earth, with one hundred and eleven kings, seven thousand geographers and nine hundred thousand businessmen.',
    summaryKo: '일곱 번째 별, 지구. 왕 백열한 명, 지리학자 칠천 명, 사업가 구십만 명이 삽니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The Earth is not just any planet. Before electricity, a real army of over four hundred and sixty thousand lamplighters lit the six continents in turn, like dancers in a ballet.',
        situationKo: '지구는 평범한 별이 아닙니다. 전기가 발명되기 전에는 사십육만 명이 넘는 가로등 켜는 사람들이 발레처럼 차례차례 여섯 대륙의 등을 켰습니다.',
        speaker: 'Narrator', line: 'About two billion grown-ups live on the Earth. Name one kind of grown-up we have already met.',
        prompt: 'Name at least one kind of grown-up from the earlier planets.',
        promptKo: '지금까지 만난 어른의 종류를 하나 이상 영어로 말해 보세요.',
        answers: [{ any: ['king', 'kings', 'geographer', 'geographers', 'businessman', 'businessmen', 'drinker', 'drinkers', 'drunkard', 'drunkards', 'tippler', 'tipplers', 'vain', 'conceited', 'lamplighter', 'lamplighters'] }],
        model: 'Kings, geographers, businessmen, drunkards, vain men, and lamplighters.',
        distractors: ['Foxes, snakes, and roses.', 'Pilots, painters, and sheep.', 'Explorers, sailors, and astronomers.'],
        hints: ['King, geographer, businessman, drinker, vain man, lamplighter.', 'One word is enough.'],
        hintsKo: ['왕(king), 지리학자(geographer), 사업가(businessman), 술꾼(drinker/drunkard), 허영심 많은 사람(vain man), 가로등 켜는 사람(lamplighter).', '한 단어만 맞아도 됩니다.'],
        reply: { speaker: 'Narrator', line: 'Seen from a little way off, it made a splendid sight.' }
      }
    ]
  },
  {
    num: 17, title: 'The Snake', ko: '뱀',
    summary: 'The first creature the little prince meets on Earth is a snake the color of the moon.',
    summaryKo: '지구에 내려온 어린 왕자가 처음 만난 것은 달빛 색깔의 뱀입니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'You have landed on Earth, but there is nobody in sight. You fear you have come to the wrong planet. Then a ring the color of the moon stirs in the sand.',
        situationKo: '지구에 도착했지만 아무도 보이지 않습니다. 별을 잘못 찾아왔나 걱정하는데, 모래 위에서 달빛 색깔의 고리 하나가 꿈틀거립니다.',
        speaker: 'The snake', line: 'Good night.',
        prompt: 'Greet it, then ask what planet this is.',
        promptKo: '인사를 한 뒤, 여기가 어느 별인지 물어보세요.',
        answers: [{ all: ['what', 'planet'] }, { all: ['which', 'planet'] }, { all: ['where', 'am', 'i'] }, { all: ['where', 'is', 'this'] }, { all: ['what', 'place'] }],
        model: 'Good night. What planet have I landed on?',
        distractors: ['Good night. Are you a sheep?', 'Good night. Could you sweep my volcanoes?', 'Good night. Is this Asteroid B-612?'],
        hints: ['"What planet is this?"', 'Key words: what/which planet'],
        hintsKo: ['"여긴 어느 별(what planet)이니?"', '핵심 단어: what/which planet'],
        reply: { speaker: 'The snake', line: 'On the Earth, in Africa.' }
      },
      {
        role: 'prince',
        situation: 'This is the desert, the snake says, and there is nobody in deserts. You sit on a stone and look up at your planet. You feel a little lonely.',
        situationKo: '이곳은 사막이고, 사막에는 아무도 없다고 뱀이 말합니다. 당신은 돌 위에 앉아 당신의 별을 올려다봅니다. 조금 외롭습니다.',
        speaker: 'The snake', line: 'The Earth is big.',
        prompt: 'Ask where the people are, and say it is a little lonely in the desert.',
        promptKo: '사람들은 어디 있는지 묻고, 사막이 조금 외롭다고 말해 보세요.',
        answers: [{ all: ['lonely'] }, { all: ['where'], any: ['men', 'people', 'humans', 'everyone', 'everybody'] }, { all: ['alone'] }],
        model: 'Where are the people? It\'s a little lonely in the desert.',
        distractors: ['Where is the railway? I want to take a train.', 'It is a little too hot in the desert.', 'Are there any baobabs in the desert?'],
        hints: ['Lonely. Where are the people?', 'Key words: lonely, or where + people'],
        hintsKo: ['외롭다(lonely), 사람들(people)은 어디(where) 있나요?', '핵심 단어: lonely 또는 where + people'],
        reply: { speaker: 'The snake', line: 'It is lonely among people, too.' }
      },
      {
        role: 'prince',
        situation: 'The snake talks strangely. It says it can carry you farther away than a ship could, and that it can help you someday if you miss your planet too much.',
        situationKo: '뱀은 알쏭달쏭한 말을 합니다. 배보다 더 멀리 데려다줄 수 있다고, 언젠가 당신이 별이 너무 그리우면 도와줄 수 있다고.',
        speaker: 'The snake', line: 'Whoever I touch, I send back to the earth he came from.',
        prompt: 'Ask why it always speaks in riddles.',
        promptKo: '왜 늘 수수께끼처럼 말하느냐고 물어보세요.',
        answers: [{ any: ['riddle', 'riddles', 'puzzle', 'puzzles', 'mysterious', 'mystery'] }],
        model: 'But why do you always speak in riddles?',
        distractors: ['Why do you always speak so loudly?', 'Can you carry me to the businessman\'s planet?', 'Are you thicker than a finger?'],
        hints: ['Point out that it only speaks in riddles.', 'Key word: riddles'],
        hintsKo: ['수수께끼(riddles)로만 말한다고 지적하세요.', '핵심 단어: riddles'],
        reply: { speaker: 'The snake', line: 'I solve them all.' }
      }
    ]
  },
  {
    num: 18, title: 'A Flower in the Desert', ko: '사막의 꽃',
    summary: 'A flower with three petals says it has seen six or seven people, years ago.',
    summaryKo: '꽃잎 세 장의 꽃은 오래전에 사람을 예닐곱 명 본 적이 있다고 합니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'Crossing the desert, you meet only one flower: a little flower with three petals, nothing special at all.',
        situationKo: '사막을 건너는 동안 만난 것은 꽃 한 송이뿐입니다. 꽃잎이 세 장뿐인, 아무 특별할 것 없는 꽃입니다.',
        speaker: 'The flower', line: 'Good morning.',
        prompt: 'Greet it, and ask where the people are.',
        promptKo: '인사를 하고, 사람들이 어디 있는지 물어보세요.',
        answers: [{ all: ['where'], any: ['men', 'people', 'humans', 'anyone', 'everyone'] }],
        model: 'Good morning. Where are the people?',
        distractors: ['Good morning. Where is the water?', 'Good morning. Are you my rose?', 'Good morning. How many petals do you have?'],
        hints: ['Where are the people?', 'Key words: where + people/men'],
        hintsKo: ['사람들(people)은 어디(where) 있나요?', '핵심 단어: where + people/men'],
        reply: { speaker: 'The flower', line: 'People? There are six or seven of them, I think. The wind blows them around. They have no roots.' }
      },
      {
        role: 'prince',
        situation: 'The flower once saw a caravan go by. People have no roots, it says, and that bothers them a lot. There is nothing more to say.',
        situationKo: '꽃은 예전에 대상(隊商)이 지나가는 것을 본 적이 있습니다. 사람들은 뿌리가 없어서 몹시 불편해한다고 합니다. 더 할 말이 없습니다.',
        speaker: 'The flower', line: '(sways in the wind)',
        prompt: 'Say goodbye.',
        promptKo: '작별 인사를 하세요.',
        answers: [{ any: ['goodbye', 'good bye', 'farewell', 'bye', 'adieu'] }],
        model: 'Goodbye.',
        distractors: ['Good morning.', 'Thank you for the water.', 'Wait for me!'],
        hints: ['One word of farewell.', 'Key word: goodbye'],
        hintsKo: ['작별 인사 한마디.', '핵심 단어: goodbye'],
        reply: { speaker: 'The flower', line: 'Goodbye.' }
      }
    ]
  },
  {
    num: 19, title: 'The Echo', ko: '메아리',
    summary: 'The little prince climbs a high mountain and calls out, but only the echo answers.',
    summaryKo: '높은 산에 올라 소리치지만 돌아오는 것은 메아리뿐입니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'You climb a high mountain, hoping to see the whole planet and all the people at once. You see nothing but sharp needles of rock. You call out.',
        situationKo: '당신은 높은 산에 오릅니다. 여기서라면 온 지구와 모든 사람을 한꺼번에 볼 수 있을 거라 기대했지만, 뾰족한 바위 봉우리뿐입니다. 소리쳐 봅니다.',
        speaker: 'The mountain', line: '(silence)',
        prompt: 'Shout to the mountains: ask them to be your friends, say you are alone. (Whatever you shout comes back as an echo.)',
        promptKo: '산을 향해 외쳐 보세요. 친구가 되어 달라고, 혼자라고. (당신이 외친 말이 메아리로 돌아옵니다.)',
        answers: [{ any: ['friend', 'friends', 'alone', 'lonely', 'who are you', 'good morning', 'hello', 'anyone', 'anybody'] }],
        model: 'Be my friends, I am alone.',
        distractors: ['Draw me a sheep. I am very busy.', 'Be my subjects. I am the king.', 'Count the stars. I am the businessman.'],
        hints: ['"Be my friends, I am alone."', 'Key words: friend / alone'],
        hintsKo: ['"내 친구(friends)가 되어 줘. 나는 혼자(alone)야."', '핵심 단어: friend / alone'],
        echo: true,
        reply: { speaker: 'The little prince', line: 'What a strange planet! The people here have no imagination. They repeat what you say to them…' }
      }
    ]
  },
  {
    num: 20, title: 'Five Thousand Roses', ko: '오천 송이 장미',
    summary: 'In a garden full of roses, the little prince learns his flower is not the only one of her kind.',
    summaryKo: '장미가 가득 핀 정원에서 어린 왕자는 자기 꽃이 세상에 하나뿐이 아님을 알게 됩니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'After walking for a long time through sand, rocks and snow, you find a road, and a garden full of roses in bloom. Every one of them looks like your flower.',
        situationKo: '모래와 바위와 눈 속을 오래 걸은 끝에 길을 발견하고, 장미가 활짝 핀 정원에 다다릅니다. 모두 당신의 꽃과 똑같이 생겼습니다.',
        speaker: 'The roses', line: 'Good morning.',
        prompt: 'Amazed, ask them who they are.',
        promptKo: '깜짝 놀라 그들이 누구인지 물어보세요.',
        answers: [{ all: ['who'] }, { all: ['what', 'are', 'you'] }],
        model: 'Who are you?',
        distractors: ['How much do you cost?', 'Are you afraid of drafts?', 'Which of you is the prettiest?'],
        hints: ['"Who are you?"', 'Key word: who'],
        hintsKo: ['"너희는 누구(who)니?"', '핵심 단어: who'],
        reply: { speaker: 'The roses', line: 'We are roses.' }
      },
      {
        role: 'prince',
        situation: 'Your flower told you there was nothing like her anywhere in the universe. Yet here are five thousand of them in a single garden. You lie down in the grass.',
        situationKo: '당신의 꽃은 우주 어디에도 자기 같은 꽃은 없다고 했습니다. 그런데 정원 하나에 오천 송이가 피어 있습니다. 당신은 풀밭에 엎드립니다.',
        speaker: 'Narrator', line: 'He had thought he was rich, with a flower like no other.',
        prompt: 'Say how you feel: your flower was only an ordinary rose, and you are not a very great prince.',
        promptKo: '지금의 기분을 말해 보세요. 나의 꽃은 흔한 장미였을 뿐이고, 나는 그리 대단한 왕자가 아니라고.',
        answers: [{ any: ['sad', 'unhappy', 'cry', 'cried', 'crying', 'wept', 'weep', 'common', 'ordinary', 'not unique', 'not special', 'not rich', 'not a great', 'not great', 'tears'] }],
        model: 'All I have is an ordinary rose. That doesn\'t make me a very great prince.',
        distractors: ['I am the richest prince of all. I own five thousand roses now.', 'I am so happy! I will take all of you home.', 'These roses are fake. Mine is the only real one.'],
        hints: ['An ordinary rose; sad; cried.', 'Key words: ordinary / sad / cried'],
        hintsKo: ['평범한(ordinary) 장미, 슬퍼서(sad) 울었다(cried).', '핵심 단어: ordinary / sad / cried'],
        reply: { speaker: 'Narrator', line: '(Lying in the grass, he cried.)' }
      }
    ]
  },
  {
    num: 21, title: 'The Fox', ko: '여우',
    summary: 'The fox teaches what it means to tame, and the secret of seeing with the heart.',
    summaryKo: '여우는 길들인다는 것의 의미와 마음으로 보는 비밀을 가르쳐 줍니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'A voice says good morning. You turn around and see nothing, until you find a very pretty fox under the apple tree. You are very sad.',
        situationKo: '누군가 인사를 합니다. 돌아봐도 아무도 없는데, 사과나무 아래 아주 예쁜 여우가 있습니다. 당신은 몹시 슬픕니다.',
        speaker: 'The fox', line: 'I am a fox.',
        prompt: 'Ask the fox to come and play with you, because you are so sad.',
        promptKo: '여우에게 같이 놀자고 청해 보세요. 당신은 너무 슬프니까요.',
        answers: [{ any: ['play'] }],
        model: 'Come and play with me. I am so sad.',
        distractors: ['Go away. I am so sad.', 'Come and count the stars with me.', 'Are you a chicken?'],
        hints: ['"Come and play with me."', 'Key word: play'],
        hintsKo: ['"나랑 놀자(play with me)."', '핵심 단어: play'],
        reply: { speaker: 'The fox', line: 'I can\'t play with you. I am not tamed.' }
      },
      {
        role: 'prince',
        situation: 'The fox cannot play because it is not "tamed". You have never heard the word.',
        situationKo: '여우는 "길들여지지" 않아서 놀 수 없다고 합니다. 처음 듣는 말입니다.',
        speaker: 'The fox', line: 'I am not tamed.',
        prompt: 'Ask what "tame" means.',
        promptKo: '"tame"이 무슨 뜻인지 물어보세요.',
        answers: [{ all: ['tame'], any: ['what', 'mean', 'means'] }, { all: ['tamed'], any: ['what', 'mean', 'means'] }, { all: ['what', 'mean'] }],
        model: 'What does "tame" mean?',
        distractors: ['Then I will play by myself.', 'Then I will tame you right now.', 'Who tamed you?'],
        hints: ['"What does tame mean?"', 'Key words: tame + mean'],
        hintsKo: ['"tame"이 무슨 뜻(mean)이니?', '핵심 단어: tame + mean'],
        reply: { speaker: 'The fox', line: 'It is something people have forgotten too much. It means to make bonds…' }
      },
      {
        role: 'prince',
        situation: 'If you tame it, the fox says, you will need each other. You will be the only one in the world for each other, and the golden wheat will remind it of your hair.',
        situationKo: '여우는 당신이 자기를 길들이면 서로가 필요해진다고 합니다. 서로에게 세상에 단 하나뿐인 존재가 되고, 금빛 밀밭도 당신의 머리칼을 떠올리게 할 거라고요.',
        speaker: 'The fox', line: 'Please… tame me!',
        prompt: 'Ask what you have to do to tame it.',
        promptKo: '여우를 길들이려면 어떻게 해야 하는지 물어보세요.',
        answers: [{ all: ['tame'], any: ['what', 'how', 'must', 'do', 'should', 'have'] }],
        model: 'What do I have to do to tame you?',
        distractors: ['What do I have to pay to buy you?', 'Why would a fox want a friend?', 'Can the wheat grow faster instead?'],
        hints: ['"What do I have to do to tame you?"', 'Key words: tame + what/how'],
        hintsKo: ['"너를 길들이려면(tame) 무엇을(what) 해야(do) 하니?"', '핵심 단어: tame + what/how'],
        reply: { speaker: 'The fox', line: 'You have to be very patient. First you will sit down a little way from me, in the grass… Each day, you can sit a little closer.' }
      },
      {
        role: 'prince',
        situation: 'Time to say goodbye. As a present, the fox gives you its secret. It is very simple.',
        situationKo: '작별의 시간. 여우가 선물로 비밀 하나를 알려 줍니다. 아주 간단한 비밀입니다.',
        speaker: 'The fox', line: 'We see clearly only with the ______.',
        prompt: 'Fill in the blank. With what do we see clearly?',
        promptKo: '빈칸을 채워 보세요. 무엇으로 보아야 똑똑히 볼 수 있을까요?',
        answers: [{ any: ['heart'] }],
        model: 'We see clearly only with the heart.',
        distractors: ['We see clearly only with the eyes.', 'We see clearly only with a telescope.', 'We see clearly only with numbers.'],
        hints: ['Not the eyes, but what is in your chest.', 'Key word: heart'],
        hintsKo: ['눈(eyes)이 아니라, 가슴 속의 그것.', '핵심 단어: heart'],
        reply: { speaker: 'The fox', line: 'What matters most cannot be seen with the eyes.' }
      },
      {
        role: 'prince',
        situation: 'It is the time you gave to your rose that makes your rose so important, says the fox. People have forgotten this truth. Then, one last thing.',
        situationKo: '여우는 당신의 장미를 그토록 소중하게 만든 것은 당신이 장미에게 쏟은 시간이라고 합니다. 사람들은 이 진리를 잊었다고요. 그리고 마지막 당부.',
        speaker: 'The fox', line: 'You are responsible forever for what you have ______.',
        prompt: 'Fill in the blank.',
        promptKo: '빈칸을 채워 보세요.',
        answers: [{ any: ['tamed', 'tame'] }],
        model: 'You are responsible forever for what you have tamed.',
        distractors: ['You are responsible forever for what you have counted.', 'You are responsible forever for what you have eaten.', 'You are responsible forever for what you have drawn.'],
        hints: ['The key word of this chapter.', 'Key word: tamed'],
        hintsKo: ['이 장의 핵심 단어입니다.', '핵심 단어: tamed'],
        reply: { speaker: 'The little prince', line: 'I am responsible for my rose…' }
      }
    ]
  },
  {
    num: 22, title: 'The Switchman', ko: '전철수',
    summary: 'The travelers on the trains rush along without knowing what they are looking for. Only the children know.',
    summaryKo: '기차 속 여행자들은 무엇을 찾는지도 모른 채 서두릅니다. 아이들만 압니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'Beside the tracks, a switchman greets you. A fast train, all lit up, rumbles past like thunder and shakes his cabin.',
        situationKo: '철길 옆에서 전철수가 인사합니다. 불을 환히 밝힌 급행열차가 천둥처럼 우르릉거리며 지나가 오두막이 흔들립니다.',
        speaker: 'The switchman', line: 'Good morning.',
        prompt: 'Ask him what he does here.',
        promptKo: '이곳에서 무슨 일을 하는지 물어보세요.',
        answers: [{ all: ['what'], any: ['do', 'doing', 'job', 'work'] }, { all: ['job'] }],
        model: 'What are you doing here?',
        distractors: ['When does the next train leave?', 'Where can I buy a ticket?', 'Why is the train so loud?'],
        hints: ['"What are you doing here?"', 'Key words: what + do'],
        hintsKo: ['"여기서 무슨 일(what)을 하세요(do)?"', '핵심 단어: what + do'],
        reply: { speaker: 'The switchman', line: 'I sort the travelers, in bundles of a thousand.' }
      },
      {
        role: 'prince',
        situation: 'The travelers are in a big hurry, but even the man who drives the engine does not know what they are looking for. Inside, they sleep or yawn.',
        situationKo: '여행자들은 몹시 서두르지만, 무엇을 찾는지는 기관차를 모는 사람조차 모른다고 합니다. 기차 안에서 사람들은 잠을 자거나 하품만 합니다.',
        speaker: 'The switchman', line: 'Only the ______ press their noses against the windows.',
        prompt: 'Fill in the blank. Who knows what they are looking for?',
        promptKo: '빈칸을 채워 보세요. 자기가 무엇을 찾는지 아는 사람들은 누구인가요?',
        answers: [{ any: ['children', 'child', 'kids', 'kid'] }],
        model: 'Only the children know what they are looking for.',
        distractors: ['Only the businessmen know what they are looking for.', 'Only the engine drivers know what they are looking for.', 'Only the geographers know what they are looking for.'],
        hints: ['The opposite of grown-ups.', 'Key word: children'],
        hintsKo: ['어른(grown-ups)의 반대.', '핵심 단어: children'],
        reply: { speaker: 'The switchman', line: 'They are lucky.' }
      }
    ]
  },
  {
    num: 23, title: 'The Merchant', ko: '장사꾼',
    summary: 'A merchant sells pills that take away thirst and save fifty-three minutes a week.',
    summaryKo: '갈증을 없애는 알약으로 일주일에 오십삼 분을 아낄 수 있다는 장사꾼을 만납니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'A merchant sells pills that take away thirst. Swallow one a week and you never need to drink. The experts say it saves fifty-three minutes a week.',
        situationKo: '장사꾼이 갈증을 없애 주는 알약을 팝니다. 일주일에 한 알만 삼키면 물을 마실 필요가 없어, 전문가들 계산으로는 일주일에 오십삼 분을 아낄 수 있다고 합니다.',
        speaker: 'The merchant', line: 'And with the fifty-three minutes? Whatever you like…',
        prompt: 'Say what you would do with those fifty-three minutes. (Walk toward a spring…)',
        promptKo: '당신이라면 그 오십삼 분을 무엇에 쓰고 싶은지 말해 보세요. (샘물을 향해 …)',
        answers: [{ any: ['walk', 'walking', 'stroll', 'spring', 'water', 'fountain', 'well', 'leisure', 'slowly'] }],
        model: 'If I had fifty-three minutes to spend, I would walk very slowly toward a spring of water.',
        distractors: ['If I had fifty-three minutes, I would buy more pills.', 'If I had fifty-three minutes, I would count my stars again.', 'If I had fifty-three minutes, I would take the express train.'],
        hints: ['Walk slowly to a spring of water.', 'Key words: walk / spring / water'],
        hintsKo: ['천천히 걸어서(walk) 샘물(spring)로 가겠다고 하세요.', '핵심 단어: walk / spring / water'],
        reply: { speaker: 'The merchant', line: '(shrugs, and goes on selling pills)' }
      }
    ]
  },
  {
    num: 24, title: 'The Desert Hides a Well', ko: '사막이 감춘 우물',
    summary: 'With the last drop of water gone, the pilot and the little prince walk in search of a well.',
    summaryKo: '마지막 물 한 방울까지 마신 조종사와 어린 왕자가 함께 우물을 찾아 걷습니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The eighth day in the desert. The water is gone. You and the little prince set out to look for a well. When the stars come out, he says:',
        situationKo: '사막에서 여드레째. 물이 다 떨어졌습니다. 당신과 어린 왕자는 우물을 찾아 걷습니다. 별이 뜨자 어린 왕자가 말합니다.',
        speaker: 'The little prince', line: 'The stars are beautiful because of a flower that you cannot see…',
        prompt: 'Why is the desert beautiful? Finish his thought: "What makes the desert beautiful is that it hides a ______ somewhere."',
        promptKo: '사막은 왜 아름다울까요? 어린 왕자의 생각을 이어 보세요. "What makes the desert beautiful is that it hides a ______ somewhere."',
        answers: [{ any: ['well', 'water', 'spring', 'oasis'] }],
        model: 'What makes the desert beautiful is that it hides a well somewhere.',
        distractors: ['What makes the desert beautiful is that it hides a snake somewhere.', 'What makes the desert beautiful is that it hides a bank somewhere.', 'What makes the desert beautiful is that it hides a train somewhere.'],
        hints: ['A place where water comes up, with a bucket and a pulley.', 'Key word: well'],
        hintsKo: ['물이 솟는 곳. 두레박이 있는 그것.', '핵심 단어: well'],
        reply: { speaker: 'The little prince', line: 'I am glad that you agree with my fox.' }
      },
      {
        role: 'pilot',
        situation: 'When the little prince falls asleep you carry him. In the moonlight you look at his pale forehead, his closed eyes, his hair trembling in the wind, and you wonder what moves you so much about him.',
        situationKo: '어린 왕자가 잠들자 당신은 그를 안고 걷습니다. 달빛 아래 창백한 이마와 감긴 눈, 바람에 흔들리는 머리칼을 보며 생각합니다. 이 아이의 무엇이 나를 이토록 뭉클하게 하는가.',
        speaker: 'Narrator', line: 'What moves me so much about this little prince asleep is his loyalty to a ______.',
        prompt: 'Fill in the blank: the thing the little prince stays faithful to, even in his sleep.',
        promptKo: '빈칸을 채워 보세요. 어린 왕자가 잠들어서도 지키는 것.',
        answers: [{ any: ['flower', 'rose'] }],
        model: 'His loyalty to a flower: a rose that shines inside him like the flame of a lamp.',
        distractors: ['His loyalty to a king.', 'His loyalty to a railway timetable.', 'His loyalty to a bottle.'],
        hints: ['The one on his planet.', 'Key words: flower / rose'],
        hintsKo: ['그의 별에 있는 그것.', '핵심 단어: flower / rose'],
        reply: { speaker: 'Narrator', line: 'And walking on like that, I found the well at daybreak.' }
      }
    ]
  },
  {
    num: 25, title: 'The Well', ko: '우물',
    summary: 'The well has a pulley like a village well, and its water is good for the heart.',
    summaryKo: '마을 우물처럼 도르래가 달린 우물의 물은 마음에 좋은 물이었습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'In the middle of the desert stands a well with a pulley, a bucket and a rope, like a village well. The pulley groans and sings. The pilot hoists the bucket to the rim. You are thirsty.',
        situationKo: '사막 한가운데 마을 우물처럼 도르래와 두레박과 밧줄이 있는 우물이 있습니다. 도르래가 삐걱거리며 노래합니다. 조종사가 두레박을 우물 가장자리까지 끌어 올립니다. 당신은 목이 마릅니다.',
        speaker: 'The pilot', line: '(sets the bucket on the rim, good and steady)',
        prompt: 'Say you want to drink this water. Ask him to give you some.',
        promptKo: '이 물을 마시고 싶다고, 마시게 해 달라고 말해 보세요.',
        answers: [{ any: ['drink', 'thirsty', 'water'] }],
        model: 'I am thirsty for this water. Give me some to drink.',
        distractors: ['I am tired of this desert. Take me home.', 'Put the bucket down. I am not hungry.', 'Is this the well the merchant sells pills for?'],
        hints: ['Thirsty; drink.', 'Key words: drink / thirsty'],
        hintsKo: ['목이 마르다(thirsty), 마시고 싶다(drink).', '핵심 단어: drink / thirsty'],
        reply: { speaker: 'Narrator', line: 'I lifted the bucket to his lips. He drank with his eyes closed. It was as sweet as a holiday.' }
      },
      {
        role: 'prince',
        situation: 'You tell the pilot that people on his planet grow thousands of roses in one garden and still miss what they are looking for, though it could be found in a single rose or a little water.',
        situationKo: '당신은 조종사에게 말합니다. 지구 사람들은 한 정원에 장미를 수천 송이씩 기르면서도 찾는 것을 찾지 못한다고. 그것은 장미 한 송이나 물 한 모금에서도 찾을 수 있는데요.',
        speaker: 'The pilot', line: 'Of course.',
        prompt: 'Go on: "But eyes are blind. You have to search with the ______."',
        promptKo: '이어서 말해 보세요. "But eyes are blind. You have to search with the ______."',
        answers: [{ any: ['heart'] }],
        model: 'But eyes are blind. You have to search with the heart.',
        distractors: ['But eyes are blind. You have to search with a lamp.', 'But eyes are blind. You have to search with a map.', 'But eyes are blind. You have to search with glasses.'],
        hints: ['Remember the fox\'s secret.', 'Key word: heart'],
        hintsKo: ['여우가 가르쳐 준 비밀을 떠올리세요.', '핵심 단어: heart'],
        reply: { speaker: 'The little prince', line: 'You must keep your promise. … A muzzle for my sheep. I am responsible for that flower!' }
      }
    ]
  },
  {
    num: 26, title: 'The Stars That Laugh', ko: '웃는 별들',
    summary: 'The little prince prepares to return to his planet, and gives the pilot stars that know how to laugh.',
    summaryKo: '어린 왕자는 자기 별로 돌아갈 준비를 합니다. 조종사에게는 웃을 줄 아는 별들을 선물합니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The next evening you find the little prince sitting on an old stone wall, talking to someone. At the foot of the wall is a yellow snake. You run, the snake slips away, and you catch him in your arms. He says he is going home today.',
        situationKo: '이튿날 저녁, 낡은 돌담 위에 앉은 어린 왕자가 누군가와 이야기하고 있습니다. 담 아래에는 노란 뱀이 있습니다. 당신이 달려가자 뱀은 스르르 사라지고, 당신은 어린 왕자를 품에 받아 안습니다. 그는 오늘 집으로 돌아간다고 합니다.',
        speaker: 'The little prince', line: 'Tonight it will be one year. My star will be right above the place where I fell.',
        prompt: 'Tell him you will not leave him; you will stay by his side.',
        promptKo: '어린 왕자를 떠나보내지 않겠다고, 곁에 있겠다고 말해 보세요.',
        answers: [{ all: ['not', 'leave'] }, { all: ['stay'] }, { all: ['not', 'go'] }, { all: ['with', 'you'] }, { all: ['never', 'leave'] }],
        model: 'I won\'t leave you.',
        distractors: ['I am going back to my airplane now.', 'I will tell the grown-ups about you.', 'I will count the days until you return.'],
        hints: ['"I won\'t leave you."', 'Key words: not leave / stay'],
        hintsKo: ['"나는 너를 떠나지(leave) 않을(not) 거야."', '핵심 단어: not leave / stay'],
        reply: { speaker: 'The little prince', line: 'Tonight… you know… don\'t come.' }
      },
      {
        role: 'pilot',
        situation: 'He has a present for you. People have stars, he says, but not the same stars: guides for travelers, problems for scholars, gold for his businessman. Your stars will be different.',
        situationKo: '어린 왕자가 선물을 준비했다고 합니다. 사람마다 별은 다른 것이라고요. 여행자에겐 길잡이, 학자에겐 풀어야 할 문제, 사업가에겐 금. 하지만 당신의 별은 다를 거라고.',
        speaker: 'The little prince', line: 'I will be living on one of them. I will be ______ on one of them.',
        prompt: 'Fill in the blank: what he will be doing on his star, and what makes your stars special.',
        promptKo: '빈칸을 채워 보세요. 어린 왕자가 그 별에서 하고 있을 일, 그래서 당신만 가지게 될 별들의 특별함.',
        answers: [{ any: ['laughing', 'laugh', 'laughs'] }],
        model: 'I will be laughing on one of them. So for you it will be as if all the stars were laughing.',
        distractors: ['I will be counting on one of them.', 'I will be sleeping on one of them.', 'I will be drinking on one of them.'],
        hints: ['A sound like little bells; something the little prince does well.', 'Key word: laughing'],
        hintsKo: ['방울처럼 울리는 소리. 어린 왕자가 잘하는 것.', '핵심 단어: laughing'],
        reply: { speaker: 'The little prince', line: 'You will have stars that know how to laugh!' }
      },
      {
        role: 'pilot',
        situation: 'He will look as if he is dead, he says, but it won\'t be true: his body is just too heavy to carry so far. Then he reminds you of his flower.',
        situationKo: '어린 왕자는 말합니다. 자기가 죽은 것처럼 보이겠지만 그것은 사실이 아니라고. 그 먼 곳까지 가져가기에는 몸이 너무 무거울 뿐이라고. 그리고 자기 꽃 이야기를 꺼냅니다.',
        speaker: 'The little prince', line: 'It\'s like the flower. If you love a flower that lives on a star…',
        prompt: 'Go on: what becomes sweet at night? "…it\'s sweet to look at the ______ at night."',
        promptKo: '이어서 말해 보세요. 밤에 무엇을 바라보는 일이 달콤해질까요? "…it\'s sweet to look at the ______ at night."',
        answers: [{ any: ['sky', 'stars', 'heavens'] }],
        model: 'If you love a flower that lives on a star, it\'s sweet to look at the sky at night. All the stars are in bloom.',
        distractors: ['…it\'s sweet to look at the engine at night.', '…it\'s sweet to look at the wall at night.', '…it\'s sweet to look at the bank at night.'],
        hints: ['The place you look up at, at night.', 'Key word: sky'],
        hintsKo: ['밤에 올려다보는 곳.', '핵심 단어: sky'],
        reply: { speaker: 'Narrator', line: 'There was nothing but a yellow flash near his ankle. He fell gently, the way a tree falls.' }
      }
    ]
  },
  {
    num: 27, title: 'Six Years Later', ko: '여섯 해가 지나고',
    summary: 'Every night the pilot listens to the stars laughing, and leaves the reader a request.',
    summaryKo: '조종사는 밤마다 별들의 웃음소리를 듣습니다. 그리고 독자에게 부탁을 남깁니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'Six years have passed. You forgot to add the leather strap to the muzzle you drew. So every night you look at the stars and wonder.',
        situationKo: '여섯 해가 흘렀습니다. 당신은 그려 준 입마개에 가죽끈을 다는 것을 깜박했습니다. 그래서 밤마다 별을 보며 자문합니다.',
        speaker: 'Narrator', line: 'Look at the sky. Ask yourselves: has the sheep eaten the flower, yes or no?',
        prompt: 'Has the sheep eaten the flower, or not? Write your answer in English.',
        promptKo: '양이 꽃을 먹었을까요, 먹지 않았을까요? 당신의 대답을 영어로 적어 보세요.',
        answers: [{ any: ['yes', 'no', 'never', 'not', 'did', 'maybe', 'perhaps', 'hope', 'eaten', 'ate', 'eat'] }],
        model: 'I hope not. He puts his flower under her glass globe every night.',
        distractors: ['The sheep is a hat.', 'Five hundred and one million.', 'Draw me another sheep.'],
        hints: ['There is no wrong answer: yes, no, or what you hope.', 'Key words: yes / no'],
        hintsKo: ['정답은 없습니다. yes 또는 no, 혹은 당신의 바람을 적으세요.', '핵심 단어: yes / no'],
        reply: { speaker: 'Narrator', line: 'And you will see how everything changes… And no grown-up will ever understand that this matters so much!' }
      },
      {
        role: 'pilot',
        situation: 'One last request. If you ever travel through the African desert and a child comes up to you who laughs, who has golden hair, who does not answer questions, please write. What news should the reader send?',
        situationKo: '마지막 부탁입니다. 언젠가 아프리카 사막을 여행하다가 웃는 아이, 금빛 머리에 질문에는 대답하지 않는 아이가 다가오면 편지를 보내 달라고. 무슨 소식을 전해 달라고 하나요?',
        speaker: 'Narrator', line: 'Then please be kind! Don\'t leave me so sad. Write to me quickly and tell me that…',
        prompt: 'Write the news in English: "He has come back."',
        promptKo: '그 소식을 영어로 적어 보세요. "그가 돌아왔다."',
        answers: [{ any: ['come back', 'came back', 'has come back', 'returned', 'return', 'is back', 'back', 'came home', 'come home'] }],
        model: 'He has come back!',
        distractors: ['The sheep has eaten the flower.', 'The engine is repaired.', 'The stars have all been counted.'],
        hints: ['To come back; to return.', 'Key words: come back'],
        hintsKo: ['돌아오다: come back / return', '핵심 단어: come back'],
        reply: { speaker: 'Narrator', line: 'This, for me, is the loveliest and the saddest landscape in the world.' }
      }
    ]
  }
];
