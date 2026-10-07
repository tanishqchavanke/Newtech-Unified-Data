// High quality realistic retail/e-commerce business dataset for N.U.D Demo Mode

export interface DemoRecord {
  Date: string;
  Product: string;
  Category: string;
  Quantity: number;
  Price: number;
  Revenue: number;
  Customer: string;
  Region: string;
}

export const DEMO_DATASET_NAME = "Retail_Sales_Demo_2024.csv";

export const DEMO_DATA: DemoRecord[] = [
  { Date: "2024-01-05", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 2, Price: 85000, Revenue: 170000, Customer: "Aarav Patel", Region: "West" },
  { Date: "2024-01-08", Product: "Ergo Wireless Mouse", Category: "Accessories", Quantity: 4, Price: 2499, Revenue: 9996, Customer: "Priya Sharma", Region: "North" },
  { Date: "2024-01-12", Product: "Pro Noise-Canceling Headset", Category: "Audio", Quantity: 1, Price: 14990, Revenue: 14990, Customer: "Vikram Malhotra", Region: "South" },
  { Date: "2024-01-15", Product: "4K UltraSharp Monitor", Category: "Displays", Quantity: 2, Price: 32000, Revenue: 64000, Customer: "Ananya Iyer", Region: "East" },
  { Date: "2024-01-19", Product: "Mechanical RGB Keyboard", Category: "Accessories", Quantity: 3, Price: 4999, Revenue: 14997, Customer: "Rohan Mehta", Region: "North" },
  { Date: "2024-01-22", Product: "USB-C Dual Dock", Category: "Accessories", Quantity: 1, Price: 5500, Revenue: 5500, Customer: "Neha Gupta", Region: "West" },
  { Date: "2024-01-26", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 1, Price: 85000, Revenue: 85000, Customer: "Karan Verma", Region: "South" },
  { Date: "2024-01-29", Product: "Smart Desk Lamp", Category: "Lighting", Quantity: 5, Price: 1999, Revenue: 9995, Customer: "Sneha Joshi", Region: "East" },
  { Date: "2024-02-02", Product: "Ergo Wireless Mouse", Category: "Accessories", Quantity: 3, Price: 2499, Revenue: 7497, Customer: "Aarav Patel", Region: "West" },
  { Date: "2024-02-05", Product: "Pro Noise-Canceling Headset", Category: "Audio", Quantity: 2, Price: 14990, Revenue: 29980, Customer: "Aditya Nair", Region: "South" },
  { Date: "2024-02-09", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 3, Price: 85000, Revenue: 255000, Customer: "Meera Sen", Region: "East" },
  { Date: "2024-02-14", Product: "4K UltraSharp Monitor", Category: "Displays", Quantity: 1, Price: 32000, Revenue: 32000, Customer: "Pooja Reddy", Region: "South" },
  { Date: "2024-02-18", Product: "Leather Desk Pad", Category: "Accessories", Quantity: 4, Price: 1299, Revenue: 5196, Customer: "Deepak Choudhary", Region: "North" },
  { Date: "2024-02-22", Product: "Mechanical RGB Keyboard", Category: "Accessories", Quantity: 2, Price: 4999, Revenue: 9998, Customer: "Sunita Roy", Region: "West" },
  { Date: "2024-02-26", Product: "USB-C Dual Dock", Category: "Accessories", Quantity: 1, Price: 5500, Revenue: 5500, Customer: "Nikhil Kulkarni", Region: "West" },
  { Date: "2024-03-02", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 2, Price: 85000, Revenue: 170000, Customer: "Vikram Malhotra", Region: "South" },
  { Date: "2024-03-06", Product: "Ergo Wireless Mouse", Category: "Accessories", Quantity: 5, Price: 2499, Revenue: 12495, Customer: "Rohan Mehta", Region: "North" },
  { Date: "2024-03-10", Product: "Pro Noise-Canceling Headset", Category: "Audio", Quantity: 3, Price: 14990, Revenue: 44970, Customer: "Ananya Iyer", Region: "East" },
  { Date: "2024-03-14", Product: "4K UltraSharp Monitor", Category: "Displays", Quantity: 2, Price: 32000, Revenue: 64000, Customer: "Tarun Kapoor", Region: "North" },
  { Date: "2024-03-18", Product: "Smart Desk Lamp", Category: "Lighting", Quantity: 2, Price: 1999, Revenue: 3998, Customer: "Shalini Bansal", Region: "West" },
  { Date: "2024-03-23", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 1, Price: 85000, Revenue: 85000, Customer: "Gaurav Singhal", Region: "East" },
  { Date: "2024-03-27", Product: "Leather Desk Pad", Category: "Accessories", Quantity: 6, Price: 1299, Revenue: 7794, Customer: "Kavita Rao", Region: "South" },
  { Date: "2024-03-30", Product: "Mechanical RGB Keyboard", Category: "Accessories", Quantity: 4, Price: 4999, Revenue: 19996, Customer: "Arjun Bhatia", Region: "North" },
  { Date: "2024-04-03", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 2, Price: 85000, Revenue: 170000, Customer: "Priya Sharma", Region: "North" },
  { Date: "2024-04-07", Product: "4K UltraSharp Monitor", Category: "Displays", Quantity: 3, Price: 32000, Revenue: 96000, Customer: "Aarav Patel", Region: "West" },
  { Date: "2024-04-11", Product: "Pro Noise-Canceling Headset", Category: "Audio", Quantity: 2, Price: 14990, Revenue: 29980, Customer: "Sameer Saxena", Region: "West" },
  { Date: "2024-04-15", Product: "Ergo Wireless Mouse", Category: "Accessories", Quantity: 6, Price: 2499, Revenue: 14994, Customer: "Divya Nambiar", Region: "South" },
  { Date: "2024-04-19", Product: "Mechanical RGB Keyboard", Category: "Accessories", Quantity: 2, Price: 4999, Revenue: 9998, Customer: "Harish Jain", Region: "East" },
  { Date: "2024-04-23", Product: "Smart Desk Lamp", Category: "Lighting", Quantity: 4, Price: 1999, Revenue: 7996, Customer: "Radhika Menon", Region: "South" },
  { Date: "2024-04-27", Product: "USB-C Dual Dock", Category: "Accessories", Quantity: 1, Price: 5500, Revenue: 5500, Customer: "Manish Tiwari", Region: "North" },
  { Date: "2024-05-02", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 3, Price: 85000, Revenue: 255000, Customer: "Vikram Malhotra", Region: "South" },
  { Date: "2024-05-06", Product: "4K UltraSharp Monitor", Category: "Displays", Quantity: 2, Price: 32000, Revenue: 64000, Customer: "Ananya Iyer", Region: "East" },
  { Date: "2024-05-11", Product: "Pro Noise-Canceling Headset", Category: "Audio", Quantity: 4, Price: 14990, Revenue: 59960, Customer: "Rajesh Pillai", Region: "South" },
  { Date: "2024-05-15", Product: "Ergo Wireless Mouse", Category: "Accessories", Quantity: 8, Price: 2499, Revenue: 19992, Customer: "Pooja Reddy", Region: "South" },
  { Date: "2024-05-20", Product: "Leather Desk Pad", Category: "Accessories", Quantity: 5, Price: 1299, Revenue: 6495, Customer: "Sunita Roy", Region: "West" },
  { Date: "2024-05-25", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 2, Price: 85000, Revenue: 170000, Customer: "Karan Verma", Region: "South" },
  { Date: "2024-05-29", Product: "Mechanical RGB Keyboard", Category: "Accessories", Quantity: 3, Price: 4999, Revenue: 14997, Customer: "Rohan Mehta", Region: "North" },
  { Date: "2024-06-03", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 4, Price: 85000, Revenue: 340000, Customer: "Amitabh Sen", Region: "East" },
  { Date: "2024-06-08", Product: "4K UltraSharp Monitor", Category: "Displays", Quantity: 3, Price: 32000, Revenue: 96000, Customer: "Shweta Deshmukh", Region: "West" },
  { Date: "2024-06-12", Product: "Pro Noise-Canceling Headset", Category: "Audio", Quantity: 2, Price: 14990, Revenue: 29980, Customer: "Aarav Patel", Region: "West" },
  { Date: "2024-06-17", Product: "Ergo Wireless Mouse", Category: "Accessories", Quantity: 7, Price: 2499, Revenue: 17493, Customer: "Deepak Choudhary", Region: "North" },
  { Date: "2024-06-22", Product: "Smart Desk Lamp", Category: "Lighting", Quantity: 3, Price: 1999, Revenue: 5997, Customer: "Nikhil Kulkarni", Region: "West" },
  { Date: "2024-06-26", Product: "Mechanical RGB Keyboard", Category: "Accessories", Quantity: 4, Price: 4999, Revenue: 19996, Customer: "Priya Sharma", Region: "North" },
  { Date: "2024-06-29", Product: "Cloud Ultra Laptop", Category: "Computers", Quantity: 2, Price: 85000, Revenue: 170000, Customer: "Tarun Kapoor", Region: "North" }
];
