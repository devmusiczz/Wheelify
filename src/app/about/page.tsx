import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mt-20 mx-auto p-4 text-white">
      <h1 className="text-4xl font-bold mb-4 text-red-500">About Wheelify</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-500">Our Mission</h2>
        <p>
          At Wheelify, we are committed to offering a wide range of premium automobile accessories, from gloves and helmets to alloys for both bikes and cars. Our mission is to enhance your driving experience with products that are not only functional but also stylish and reliable.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-500">Our Technology</h2>
        <p>
          Our platform leverages the power of modern web technologies to ensure a fast, secure, and user-friendly experience:
        </p>
        <ul className="list-disc list-inside">
          <li>React: For dynamic and responsive user interfaces.</li>
          <li>Next.js: To deliver a fast and optimized browsing experience.</li>
          <li>Tailwind CSS: For sleek and intuitive design.</li>
          <li>Wix Headless CMS: To efficiently manage our backend content.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-500">Features and Functionalities</h2>
        <p>Wheelify is designed with a host of features to make your shopping experience smooth and enjoyable:</p>
        <ul className="list-disc list-inside">
          <li>Dynamic Homepage: Featuring a slider that changes every 5 seconds, showcasing our top products and deals. Hover over featured products to see alternative images.</li>
          <li>Product List and Search: Easily browse and search for products with advanced filtering, sorting, and pagination.</li>
          <li>Detailed Product Pages: View multiple images, read detailed descriptions, and select product options with real-time stock updates.</li>
          <li>User Reviews: Check out reviews from other customers and leave your own feedback after purchase.</li>
          <li>Cart and Checkout: Add items to your cart, manage your selections, and proceed through a streamlined checkout process, with options for guest checkout and multiple payment methods.</li>
          <li>User Account: Register and manage your profile, view order history, and save details for quicker checkouts.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-500">Our Commitment</h2>
        <p>
          We are dedicated to providing exceptional customer service and high-quality products. Your satisfaction is our top priority, and we strive to make every purchase a pleasant experience.
        </p>
        <p>
          Thank you for choosing Wheelify. We look forward to serving you and enhancing your journey on the road.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
