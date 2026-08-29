/**
 * Frequently asked questions.
 *
 * Every answer here comes from the Barra Cabanas guest info sheet -- nothing
 * is invented. This is the single source for both the visible page and the
 * FAQPage structured data, so the two can never drift apart.
 *
 * Deliberately omitted:
 *  - the WiFi password, which must not be published
 *  - nightly rates, which are still to be confirmed by the owner
 */

export const FAQ_SECTIONS = [
  {
    id: 'the-houses',
    heading: 'The houses',
    items: [
      {
        q: 'How many people does a house sleep?',
        a: 'Each house sleeps 12 guests across 6 en-suite bedrooms. Four bedrooms have queen beds and two have two single beds each. There are 5 showers and 1 bath.',
      },
      {
        q: 'Are the houses self-catering?',
        a: 'Yes. Every house has a fully equipped modern kitchen with a gas stove and oven, fridge, deepfreeze, microwave, airfryer, kettle, toaster, coffee plunger, and a full set of pots, pans, cutlery, crockery and glasses. Basic baking sets are available on request.',
      },
      {
        q: 'Is there air-conditioning and WiFi?',
        a: 'Yes. There is air-conditioning in all bedrooms and the living room, and uncapped free Starlink WiFi throughout. The living room has a 65-inch 4K UHD smart TV -- please sign in with your own streaming accounts and sign out before you leave. WiFi details are provided on arrival.',
      },
      {
        q: 'Is there a pool and a braai?',
        a: 'Yes. Each house has a private splash pool with a view and a braai on the veranda, plus sun loungers on the porch. Please note the pools are shallow: diving is not permitted, and guests should not climb or sit on the pool sides.',
      },
      {
        q: 'What should I bring with me?',
        a: 'Because the houses are self-catering, bring your own toiletries -- soap, shampoo and personal items. Bath towels are provided but bring your own swimming towels. Also bring insect repellent and room spray, and your own gazebo and beach chairs if you want them. Starter toilet paper is provided; guests buy more once it runs out.',
      },
      {
        q: 'What kind of plug points do the houses use?',
        a: 'South African wall plugs. Bring adapters if your devices use a different fitting.',
      },
    ],
  },
  {
    id: 'booking-and-stay',
    heading: 'Booking and your stay',
    items: [
      {
        q: 'What are the check-in and check-out times?',
        a: 'Check-in is from 2:00 PM and check-out is by 10:00 AM. Late check-out is possible only by prior arrangement and approval.',
      },
      {
        q: 'Is there a minimum stay?',
        a: 'During peak season, from 15 December to 15 January, the minimum stay is 14 nights. Outside peak season there is no 14-night minimum.',
      },
      {
        q: 'What happens if we exceed the sleeping capacity of the house?',
        a: 'Additional guests beyond the house capacity are charged R500 per person per night. Extra mattresses and bedding are provided, but this must be arranged before arrival.',
      },
      {
        q: 'Are pets allowed?',
        a: 'Pets are not allowed unless arranged in advance and confirmed in writing.',
      },
      {
        q: 'Can we host an event or party?',
        a: 'Events, parties and gatherings are not permitted without prior written consent. There is strictly no music or noise after 11 PM, out of respect for fellow guests and neighbours.',
      },
      {
        q: 'Is smoking permitted?',
        a: 'Smoking is not permitted inside the houses. Please smoke outside and use the ashtrays provided.',
      },
    ],
  },
  {
    id: 'getting-there',
    heading: 'Getting there and the border',
    items: [
      {
        q: 'Do I need a 4x4 to reach Barra Cabanas?',
        a: 'No. A 4x4 is not needed to reach Barra Cabanas. There is under-cover parking for cars and boats, and a boat launch right next to the houses.',
      },
      {
        q: 'What do I need to cross the border into Mozambique?',
        a: 'Bring your passport and driver’s licence. You need compulsory third-party insurance, which can be bought online through the DriveMoz Facebook page or at the Engen garage about 4 km from the Lebombo border as you turn towards Komatipoort, and costs roughly R250 to R300. Do not let anyone help you stamp passports or fill in car papers on the Mozambican side.',
      },
      {
        q: 'What vehicle paperwork do I need?',
        a: 'You need your green licence (MR1) paper, from which your licence disc was cut, to present at the Mozambican side. If the vehicle is financed you need a letter from the bank authorising you to take it across the border. If you are not the owner you need a certified letter from the owner. You also need a letter from your insurer confirming the vehicle is insured and for which countries.',
      },
      {
        q: 'What stickers do I need on my car and trailer?',
        a: 'A black and white ZA sticker must be displayed in plain sight, preferably on the back of the vehicle. If you are towing a trailer, display a sticker with a yellow triangle on a blue square on both the front of the vehicle and the rear of the trailer. Stickers are available at the border, but are much cheaper at Outdoor Warehouse.',
      },
      {
        q: 'Where should I exchange money?',
        a: 'Exchange rands for meticais at the Engen garage for the best rate -- do not exchange money at the border. Meticais can also be drawn from ATMs inside Mozambique, and most shops and restaurants accept cards.',
      },
      {
        q: 'Will my phone work in Mozambique?',
        a: 'You can enable roaming, which is expensive, or buy a local SIM card and airtime at the garage on your right just after the border on the Mozambican side. Movitel and Vodacom are both available, and a SIM costs around R30.',
      },
    ],
  },
  {
    id: 'on-site',
    heading: 'Services on site',
    items: [
      {
        q: 'Are the houses cleaned during our stay?',
        a: 'Yes. Units are serviced daily. A cleaner arrives every morning at 8:00 to wash dishes and clean. Tips are welcome.',
      },
      {
        q: 'Can we do laundry?',
        a: 'There are no washing machines or dryers inside the houses, and laundry is not included in the daily cleaning service. Personal laundry can be arranged at an additional cost, charged per kilogram: 0–5 kg is 400 meticais, 6–10 kg is 600 meticais, and 11–15 kg is 800 meticais. Ironing is not offered. Please request a receipt.',
      },
      {
        q: 'What cleaning supplies are provided?',
        a: 'Basics such as Sunlight liquid and refuse bags are supplied. Guests should bring their own room spray and insect repellent.',
      },
    ],
  },
];

/** Flat list of every question, used for the FAQPage structured data. */
export const FAQ_ITEMS = FAQ_SECTIONS.flatMap((section) => section.items);

/** schema.org FAQPage describing every question on the page. */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.barracabanas.com/faq#faq',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
