# Candy Fluffs

Candy Fluffs is an eCommerce website for a talented [illustrator, Candy Joy](https://www.instagram.com/candy_fluffs/), built with GatsbyJS, powered by GraphQL, and designed with love using Figma. It leverages various technologies and services, including DatoCMS, Snipcart, and Stripe, to provide a seamless shopping experience.
![CandyFluffs Home page](https://github.com/brittgalloway/candyfluffs-1/assets/50898741/c286b558-8255-4735-9d3b-b57cb75ccc48)

## Team

- **[Doug](https://github.com/daleinen7)**: Lead Developer
- **[Stephanie](https://github.com/mlisdev)**: Front-end Developer
- **[Brittney](https://www.linkedin.com/in/brittneygalloway/)**: Designer and Maintenance Developer

---

## Table of Contents

- [Introduction](#candy-fluffs)
- [Team](#team)
- [Table of Contents](#table-of-contents)
- [Setup](#setup)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

---

## Setup

### Technologies Used

Candy Fluffs is powered by the following technologies and services:

- GatsbyJS
- npm
- GraphQL
- DatoCMS
- Snipcart
- Stripe
- Mailchimp
- [Figma](https://www.figma.com/file/IndaqA3RP8qZew4yHcXYQI/candyFluffs?node-id=26%3A9)

### Getting Started

To run Candy Fluffs locally or deploy it, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/candyfluffs-1.git
   cd candy-fluffs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file and configure it with your environment-specific settings, including API keys, Stripe configuration, and any other required configurations.

4. **Start the development server:**

   ```bash
   npm run develop
   ```

5. **Open your browser:**

   Your Candy Fluffs site should now be running locally at [http://localhost:8000](http://localhost:8000).


---

## Usage

Candy Fluffs provides a smooth shopping experience. Customers can explore a variety of products, add items to their cart, and securely complete their purchases using Snipcart, which we've configured to use Stripe.

As a user, on the home page all of the products are availilable, navigation to the different product types (Books, Prints, Scrolls, Stickers, Buttons, and Charms), an original title called "Necahual", and Conventions/Expos to find live events they will be at.

- On Desktop, you can hover over the product to reveal the title and price. If you click on it, you will be taken to the product page.
- Clicking on naviagation for Books, filters and shows all the books availilable.
- Nechual has all the Necahual products as well as a link to the webtoon and Necahual social media.
- Conventions/Expos will show you all of the Live events the artist will be at in the year. There will be links to get tickets to the event if applicable.
- PRODUCT PAGE: View the product and all it's variations (if applicable)
  - Select the variation you'd like
  - Add to cart by clicking the button
  - The cart icon in the header should have a number that reflects the amount of items you've added.
  - The purchase can be completed, and the cart edited by clicking on the `cart icon`.
  - The `cart icon` is availilable on all pages.
- Footer
  - Here you can signup for the Candy Fluffs newsletter.
  - Go to the about page and learn about Candy Joy.
  - Go to the contact page and message the Candy Joy.

---

## Preview

![Product type gallery](https://github.com/brittgalloway/candyfluffs-1/assets/50898741/49f41c25-1474-4538-a3fe-6fd69e4bdef7)
![Product page](https://github.com/brittgalloway/candyfluffs-1/assets/50898741/17472f43-f4c0-45e2-950e-59d6d9150b2d)

---


## Future Features

- Migrate to Nextjs
- Use Stripe Checkout
- Add better search and indexing

---

## License

This project is licensed under the [The BSD Zero Clause License](./LICENSE).
