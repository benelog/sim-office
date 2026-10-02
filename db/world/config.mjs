// The rules of the game: config k → [value, note]. The engine reads them as CFG.<k> (a number when the value reads
// as one). office/PLAN.md tells what each group of keys does.

export const config = {
  absent_points: ['4', 'strikes for a working day you never came in (not on a trip, not sick)'],
  atm_amounts: ['20,40,60,100,200', "the amounts on an ATM's screen ($20 bills)"],
  atm_daily_limit: ['500', 'the most you can take out of ATMs in a day'],
  atm_fee: ['3', "what another bank's ATM charges for each withdrawal (shown before you accept it)"],
  atm_own: ['atm_cu', "the ATMs of the heroes' own bank (Fairview Credit Union): no fee, cash deposits"],
  bank_name: ['Fairview Credit Union', 'the bank of your checking account'],
  benefits_close: ['2026-10-23', 'open enrollment closes at the end of this day; submitting again before then replaces the choices'],
  benefits_default: [
    'med_hmo+den_none+vis_none',
    'the plans you get from benefits_start if you do not submit in open enrollment (plans ids)'
  ],
  benefits_now: [
    'jun:med_ppo+den_ppo+vis_plan+4@d4_benefits,derek:med_ppo+den_ppo+vis_plan+8,priya:med_hsa+den_ppo+vis_plan+6',
    'each hero: plans and 401(k) % until benefits_start (@episode: once it is done; before, the default and k401_auto). heroes.salary_net is the paycheck with these'
  ],
  benefits_open: [
    '2026-10-12',
    'open enrollment in the HR portal opens on this day (phone or Work record): medical, dental and vision from the plans table'
  ],
  benefits_start: ['2026-11-01', 'the plans picked in open enrollment start on this day: every paycheck after it has their premiums'],
  bus_alert_time: ['06:30', 'when the rainy-day service alert comes'],
  bus_delay_from: ['2', 'the first game day buses can be late or full (day 1 keeps to the timetable)'],
  bus_delay_max: ['15', 'nobody gets on a bus more than this many minutes after the time on the timetable'],
  bus_every: ['20', 'minutes between buses on weekdays'],
  bus_every_weekend: ['30', 'minutes between buses on weekends and federal holidays'],
  bus_fare: ['2.50', 'one bus ride'],
  bus_first: ['06:00', 'the first bus of the day'],
  bus_full_chance: ['0.06', 'in the rush hours, the share of buses too full to stop (half again in the rain; never two in a row)'],
  bus_full_gap: ['4-8', 'minutes from a full bus to the one behind it'],
  bus_last: ['22:30', 'the last bus of the day'],
  bus_late: ['1-3', 'how late a bus runs at other times, in minutes'],
  bus_late_chance: ['0.1', 'at other times, the share of buses that run a little late'],
  bus_late_chance_rain: ['0.8', 'on a rainy day, the share of buses that run late'],
  bus_late_chance_rush: ['0.5', 'in the rush hours of a dry working day, the share of buses that run late'],
  bus_late_rain: ['5-10', 'how late a bus runs in the rain, in minutes (up to 3 more in the rush hours)'],
  bus_late_rush: ['3-8', 'how late a bus runs in the rush hours, in minutes'],
  bus_line: ['12', 'the bus line number (the Number 12)'],
  bus_rush: ['07:00-09:30,16:30-18:30', 'the rush hours of a working day (buses leaving in them can be late or full)'],
  card_close_dom: ['20', 'a card statement closes on this date of every month'],
  card_due_days: ['25', 'the payment is due this many days after the statement closes'],
  card_graduate_after: [
    '3',
    'a secured card becomes its graduates_to card after this many on-time payments in a row with no late mark (banks look after 6 to 12 months)'
  ],
  card_limit: [
    'jun:1000,derek:12000,priya:8000',
    'credit limit of an unsecured card for each hero (Jun: when his secured card graduates)'
  ],
  card_reminder_days: ['5', 'the bank emails a payment reminder this many days before the due date (autopay off)'],
  card_start: [
    'derek:fcu_rewards,priya:fcu_rewards',
    'the card each hero already has on day 1 (hero:card id); Jun has no U.S. credit history and none'
  ],
  cash_back: ['20,40,60', 'the cash back amounts'],
  cash_back_place: ['market_checkout', 'where the cashier gives cash back with a purchase made there (no fee)'],
  cash_only: ['farm_stand,bakery_stand', 'places that take only cash (the farmers market stands)'],
  city: ['Fairview', 'fictional US city'],
  closet_outfits: ['7', 'clean outfits after a load of laundry (5 at the start)'],
  company: ['Seaside Labs', 'the IT company the player works for'],
  company_holidays: [
    '2026-11-26,2026-11-27,2026-12-24,2026-12-25,2027-01-01,2027-01-18,2027-02-15',
    'dates the office is closed: a paid day off, nobody is expected at work'
  ],
  copay_clinic: ['40', 'what you pay for a visit to the walk-in clinic with your health insurance'],
  copay_flushot: ['0', 'a flu shot at the pharmacy: preventive care, nothing to pay with insurance'],
  copay_rx: ['10', 'what you pay for a prescription with your health insurance (a generic drug); the rest is covered'],
  credit_months: ['jun:0,derek:168,priya:96', 'months of U.S. credit history each hero has on day 1 (0: no history, no score)'],
  credit_util_start: ['jun:0,derek:0.31,priya:0.06', 'the share of the credit limit on the last statement reported before day 1'],
  day_end: ['23:00', 'you fall asleep wherever you are'],
  day_start: ['07:00', 'the alarm'],
  early_before: ['16:00', 'leaving the office before this on a working day and not coming back is leaving early'],
  early_points: ['2', 'strikes for leaving early'],
  energy_max: ['100', 'the energy bar'],
  energy_per_hour: ['-6', 'energy lost per game hour awake'],
  final_points: ['4', 'strikes at which HR emails a final written warning'],
  fire_points: ['6', 'strikes at which you are let go: the badge no longer opens the office'],
  flu_share: [
    '1:40,2:35,3:20,10:10,11:20,12:35',
    'percent of the illnesses that are the flu, by month (other months 5); the rest are colds'
  ],
  flu_shot_factor: ['0.4', 'a flu shot this season (September to March) multiplies the chance that an illness is the flu by this'],
  friend_chat: ['2', 'closeness for Chat with someone, the first time a day'],
  friend_coffee_energy: ['8', 'energy from the coffee a Friend brings you on a morning chat at work (once a week each)'],
  friend_cover_days: ['14', 'a Close friend gives your update at a missed meeting at most once in this many days'],
  friend_diner: ['10', 'closeness for lunch at the diner with a Friend who invited you'],
  friend_diner_item: ['diner_club', 'what you have at the diner with a friend (items id; you pay for it with tax and tip)'],
  friend_fade: ['1', 'closeness lost each day after friend_fade_days without time together'],
  friend_fade_days: ['5', 'days without time together before closeness starts to fade'],
  friend_invite_chance: ['0.4', 'chance of an invitation on a working day when a Friend is at work'],
  friend_invite_days: ['5', 'at least this many days between two invitations'],
  friend_invite_time: ['10:45', 'when an invitation to lunch at the diner comes (working days after the missions)'],
  friend_levels: ['20,45,70', 'closeness (0-100) for Friendly, Friend and Close friend'],
  friend_lunch: ['6', 'closeness for lunch together in the office kitchen (everyone at the table)'],
  friend_lunch_energy: ['10', 'energy from lunch in the office kitchen'],
  friend_lunch_time: ['12:30', 'a Friend who invited you is in the booth at the diner from 15 minutes before this until an hour after'],
  friend_meeting: ['1', 'closeness with everyone else in a conversation or a meeting you finish'],
  friend_noshow: ['4', 'closeness lost when you do not come to a lunch you were invited to'],
  friend_people: ['maya,derek,priya,jun,sam,linda,tom', 'coworkers you can get close to (the hero you play is left out)'],
  friend_reply: ['good:3,ok:1,poor:-2', 'closeness for answering their text or email, by the tone of your answer'],
  friend_review: ['3', 'at the review: a point for each coworker who is a Friend or closer, at most this many'],
  friend_start: [
    'jun/derek:10,derek/priya:30,derek/maya:25,derek/sam:20,derek/tom:15,priya/derek:30,priya/maya:25,priya/linda:20,priya/tom:15',
    "closeness on day 1, hero/coworker:points (Derek and Priya have worked together for a while; Derek is Jun's onboarding buddy)"
  ],
  friend_talk: ['4', 'closeness for a conversation with them, at most (by the points you got in it)'],
  friend_task: ['2', 'closeness for handling well what they sent to your desk (lost for handling it badly)'],
  hours_bakery_stand: ['closed', 'the farmers market is on weekends only'],
  hours_bakery_stand_weekend: ['08:00-13:00', 'the farmers market: Saturday and Sunday mornings'],
  hours_clinic: ['09:00-19:00', 'the walk-in clinic next to the pharmacy, weekdays'],
  'hours_clinic_2026-11-26': ['closed', 'Thanksgiving'],
  'hours_clinic_2026-12-24': ['09:00-14:00', 'Christmas Eve'],
  'hours_clinic_2026-12-25': ['closed', 'Christmas'],
  'hours_clinic_2026-12-31': ['09:00-15:00', "New Year's Eve"],
  'hours_clinic_2027-01-01': ['closed', "New Year's Day"],
  hours_clinic_weekend: ['10:00-16:00', 'the walk-in clinic on Saturday and Sunday'],
  hours_coffee_cart: ['06:30-15:00', 'the coffee cart on weekdays'],
  'hours_coffee_cart_2026-11-26': ['closed', 'Thanksgiving'],
  'hours_coffee_cart_2026-12-24': ['08:00-12:00', 'Christmas Eve'],
  'hours_coffee_cart_2026-12-25': ['closed', 'Christmas Day'],
  'hours_coffee_cart_2027-01-01': ['closed', "New Year's Day"],
  hours_coffee_cart_weekend: ['08:00-14:00', 'the coffee cart on Saturday and Sunday'],
  hours_diner: ['06:30-21:30', 'Sunny Side Diner opening hours'],
  'hours_diner_2026-11-26': ['closed', 'Thanksgiving'],
  'hours_diner_2026-12-24': ['06:30-15:00', 'Christmas Eve'],
  'hours_diner_2026-12-25': ['closed', 'Christmas Day'],
  'hours_diner_2026-12-31': ['06:30-16:00', "New Year's Eve"],
  'hours_diner_2027-01-01': ['08:00-15:00', "New Year's Day"],
  hours_farm_stand: ['closed', 'the farmers market is on weekends only'],
  hours_farm_stand_weekend: ['08:00-13:00', 'the farmers market: Saturday and Sunday mornings'],
  hours_market: ['07:00-22:00', 'Fairview Market opening hours'],
  'hours_market_2026-11-26': ['07:00-16:00', 'Thanksgiving: the market closes early'],
  'hours_market_2026-12-24': ['07:00-18:00', 'Christmas Eve'],
  'hours_market_2026-12-25': ['closed', 'Christmas Day'],
  'hours_market_2026-12-31': ['07:00-20:00', "New Year's Eve"],
  'hours_market_2027-01-01': ['09:00-20:00', "New Year's Day"],
  hours_pharmacy: ['09:00-19:00', 'Fairview Pharmacy (the counter in Fairview Market), weekdays'],
  'hours_pharmacy_2026-11-26': ['closed', 'Thanksgiving'],
  'hours_pharmacy_2026-12-24': ['09:00-15:00', 'Christmas Eve'],
  'hours_pharmacy_2026-12-25': ['closed', 'Christmas'],
  'hours_pharmacy_2026-12-31': ['09:00-17:00', "New Year's Eve"],
  'hours_pharmacy_2027-01-01': ['closed', "New Year's Day"],
  hours_pharmacy_weekend: ['10:00-17:00', 'Fairview Pharmacy on Saturday and Sunday'],
  hybrid_from: ['2026-11-09', 'hybrid work starts this date (after the missions): config remote_days are worked from home'],
  ill_chance: [
    '1:3,2:2.5,3:1.5,4:1,5:0.6,6:0.5,7:0.5,8:0.5,9:0.7,10:1,11:1.5,12:2.5',
    'chance in percent of falling ill on a morning of free play, by month (month:percent)'
  ],
  ill_days: ['cold:4,flu:6', 'how many days a cold and the flu last'],
  ill_rest_days: ['14', 'no new illness for this many days after the last one ended'],
  ill_wet_factor: ['3', 'the chance of falling ill is this many times higher the morning after you got soaked in the rain'],
  k401_auto: ['3', '401(k) percent of pay a new hire is enrolled at automatically'],
  k401_match: ['100', 'the company adds this percent of what you put into your 401(k), up to k401_match_up_to'],
  k401_match_up_to: ['4', 'the company match counts your 401(k) up to this percent of pay'],
  k401_max: ['15', 'the highest 401(k) percent the HR portal takes'],
  late_after: ['09:15', 'getting to the office after this on a workday is late'],
  late_points: ['2', 'strikes for coming in after late_after (before noon)'],
  latitude: ['37.6', 'Fairview, for sunrise and sunset'],
  laundry_hours: ['07:00-22:00', 'the laundry room of an apartment building'],
  longitude: ['-122.4', 'Fairview, for sunrise and sunset (west is negative)'],
  low_balance: ['100', 'the bank sends an alert when the balance falls below this'],
  mail_time: ['13:00', 'the mail comes to the mailbox after this (not on Sundays and federal holidays)'],
  minutes_per_second: ['1', 'game minutes per real second while walking'],
  mission_bonus: ['1000', 'dollars the company pays when every mission is done'],
  mission_days: ['15', 'the missions (every conversation of the hero) run through this game day; free play after that'],
  mission_points: ['200', 'points for finishing every mission'],
  noise_chance: [
    'weekday:0.08,weekend:0.25',
    'chance that a neighbor is loud when you go to bed at home after the missions (weekend: Friday and Saturday nights)'
  ],
  noise_gap_days: ['5', 'no loud night within this many days of the last one'],
  noon_points: ['3', 'strikes for coming in after noon'],
  order_carrier: ['Parcel Express', 'who brings the packages'],
  order_carrier_ko: ['파슬 익스프레스', 'its name in Korean'],
  order_days: ['2', 'a package comes on this business day after the order (Monday to Friday, not federal holidays)'],
  order_free_over: ['35', 'orders of this much or more (before tax) ship free'],
  order_hold_days: ['7', 'days a package waits at the counter before it goes back to the store (refunded)'],
  order_pickup: ['market_checkout', "the carrier's counter: Fairview Market's checkout (bring a photo ID)"],
  order_shipping: ['5.99', 'shipping for an order under order_free_over'],
  order_store: ['Northpine', 'the online store (Phone > Shop online)'],
  order_store_ko: ['노스파인', 'its name in Korean'],
  order_tries: ['2', 'times the driver tries a package that needs a signature before it goes to the counter'],
  overdraft_fee: ['35', 'charged (once a day) when a payment takes the account below zero'],
  payday_days: ['5,19', 'the first paydays (game days, Fridays); after the last one, every payday_every days'],
  payday_every: ['14', 'days between paydays after payday_days: every other Friday; a day early when the bank is closed'],
  player_name: ['Jun', 'default player name; the player can change it'],
  probation_extend_days: ['30', 'a new hire whose review needs improvement: probation goes on this many days, then is looked at again'],
  pto_hours_year: [
    'jun:120,derek:160,priya:120',
    'PTO hours a year for each hero (hero:hours, or one number), built up evenly over 26 paychecks'
  ],
  pto_notice_days: ['14', 'PTO is asked for at least this many days ahead; the manager answers the next morning'],
  pto_start: ['jun:0,derek:56,priya:40', 'PTO hours each hero has on day 1 (Jun is new)'],
  punch_card_every: ['6', 'buy 5 drinks, the 6th is free'],
  punch_card_place: ['coffee_cart', 'where drinks are stamped on a punch card'],
  radio_station: ['KFVW 88.5', 'the local station on the radio at home'],
  rain_energy_per_hour: ['-10', 'extra energy lost per hour walking in heavy rain without an umbrella'],
  raise_exceeds: ['5', 'raise in percent for a review that exceeds expectations'],
  raise_meets: ['3', 'raise in percent for a review that meets expectations'],
  remote_days: [
    'mon,fri',
    'hybrid work: the days worked from home (log in at the desk at home); the other weekdays are office days'
  ],
  remote_people: [
    'maya,derek,priya,jun,linda',
    'hybrid work: who stays away from the office on a remote day (the front desk and IT still come in)'
  ],
  rent: ['1450', "monthly rent (the hero's own housing in heroes), due on rent_day_of_month"],
  rent_day_of_month: ['1', 'rent or the mortgage comes out on this date of every month (Nov 1 = game day 28)'],
  repair_chance: ['0.08', 'chance on a morning after the missions that something at home breaks'],
  repair_fridge_items: [
    'milk,bacon,deli_turkey,ground_beef,grapes,strawberries,broccoli,ice_cream,frozen_pizza',
    'what goes bad every morning while the fridge (and its freezer) is broken'
  ],
  repair_gap_days: ['7', 'no new breakdown within this many days of the last repair'],
  review_bonus: ['1500', 'bonus for exceeding expectations at a year-end review (not at the end of probation)'],
  salary_gross: ['3654', 'gross pay per paycheck, shown on the pay stub'],
  salary_net: ['2600', 'net pay per paycheck (biweekly, direct deposit on payday Fridays)'],
  sales_tax: ['0.0825', 'sales tax on meals, drinks and other goods (8.25%); groceries and fares are not taxed'],
  season_bare: [
    '12-01,01-10',
    'the turned trees drop their leaves one by one between these dates (the woods beyond town thin out the same way)'
  ],
  season_fall: [
    '10-20,11-15',
    'autumn colours: the broadleaf trees start to turn, all turned (each tree a few days apart; about a third are live oaks that stay green)'
  ],
  season_lights: ['11-27,01-03', 'holiday decorations (string lights, wreaths, the town tree, the lobby tree): first day, last day'],
  season_litter: [
    '11-01,11-25,12-15,01-20',
    'fallen leaves on the lawns and sidewalks: start, most, raking starts, raked (a few stay until spring)'
  ],
  season_spring: ['03-01', 'the leaves are back and the fallen leaves gone'],
  sick_call_by: ['09:30', 'text your manager before this to be out sick today (later: the next working day)'],
  sick_hours: ['40', 'sick time in hours, given at the start and again on January 1 (California: at least 40 hours or five days)'],
  sick_note_days: ['3', "out sick this many working days in a row: HR asks for a doctor's note"],
  start_cash: [
    'jun:40,derek:120,priya:60',
    'cash in the wallet on day 1 (hero:dollars, or one number); start_money is the checking account'
  ],
  start_date: ['2026-10-05', 'the real date of game day 1 (a Monday)'],
  start_money: ['1200', 'dollars in the bank on day 1'],
  tax_medicare: ['1.45', 'Medicare, percent of pay after the premiums'],
  tax_ss: ['6.2', 'Social Security, percent of pay after the premiums (the 401(k) does not lower it)'],
  tax_state: [
    '5.5',
    "state income tax, percent of pay after the premiums and the 401(k) (an effective rate; federal is each hero's own, from benefits_now and salary_net)"
  ],
  tip_default: ['18', 'the tip chosen at first where you are served at a table (diner, restaurant); 0 at a counter'],
  tip_options: ['0,15,18,20', 'tip choices in percent where food or drinks are served'],
  transit_sender: ['Fairview Transit', 'who sends the service alert on a rainy day'],
  trash_bags: [
    'cook:0.15,eat:0.05,toss:0.1,day:0.15',
    'how much trash (in kitchen bags) each thing in the log adds at home: cooking, eating, throwing food out, and every day'
  ],
  trash_cart_bags: ['4', "bags that fit in a house's trash cart (Derek), emptied on pickup day when it is at the curb"],
  trash_fee: [
    'jun:35,derek:25,priya:35',
    'what a smelly trash pile costs (pest control for renters, an HOA fine for Derek), once a week from the fourth smelly morning'
  ],
  trash_holidays: [
    '2026-11-26,2026-12-25,2027-01-01',
    'no pickup on these days: pickup is a day late in a week with one on or before the pickup day'
  ],
  trash_pickup_day: ['Thursday', "trash and recycling pickup day on Derek's street (the building bins of the renters are always open)"],
  trash_smell_bags: [
    '3',
    'this many bags left at home smell: fruit flies (energy), a note from the landlord, management or HOA, then a charge'
  ],
  utc_offset: ['-7', 'the clock of Fairview (Pacific time; the game does not change it for daylight saving)'],
  warn_points: ['2', 'strikes at which the manager texts you about being on time'],
  week_good_points: ['15', 'points for a week at or above the expected hours at your desk (free play)'],
  week_low_points: ['15', 'points lost for a week under half the expected hours at your desk (free play)'],
  work_end: ['18:00', 'core hours'],
  work_hours_day: [
    '4',
    'hours at your desk (Work for an hour) the manager expects for each day you came in, looked at weekly after the missions'
  ],
  work_start: ['09:00', 'core hours']
};
