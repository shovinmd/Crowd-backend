const express = require("express");
const router = express.Router();

// Static Mumbai transport network data
const mumbaiTransportNetwork = {
  "Train": {
    "Western": ["Churchgate", "Marine Lines", "Charni Road", "Grant Road", "Mumbai Central", "Mahalaxmi", "Lower Parel", "Prabhadevi", "Dadar", "Matunga", "Mahim", "Bandra", "Khar Road", "Santacruz", "Vile Parle", "Andheri", "Jogeshwari", "Ram Mandir", "Goregaon", "Malad", "Kandivali", "Borivali", "Dahisar", "Mira Road", "Bhayandar", "Naigaon", "Vasai Road", "Nallasopara", "Virar"],
    "Central": ["Chhatrapati Shivaji Maharaj Terminus", "Masjid", "Sandhurst Road", "Byculla", "Chinchpokli", "Currey Road", "Parel", "Dadar", "Matunga", "Sion", "Kurla", "Vidyavihar", "Ghatkopar", "Vikhroli", "Kanjurmarg", "Bhandup", "Nahur", "Mulund", "Thane", "Kalwa", "Mumbra", "Diva", "Kopar", "Dombivli", "Thakurli", "Kalyan", "Shahad", "Ambivli", "Titwala", "Khadavli", "Vasind", "Asangaon", "Atgaon", "Khardi", "Kasara"],
    "Harbour": ["Chhatrapati Shivaji Maharaj Terminus", "Masjid", "Sandhurst Road", "Dockyard Road", "Reay Road", "Cotton Green", "Sewri", "Wadala Road", "Kings Circle", "Mahim", "Bandra", "Khar Road", "Santacruz", "Vile Parle", "Andheri", "Jogeshwari", "Ram Mandir", "Goregaon", "Malad", "Kandivali", "Borivali"]
  },
  "Metro": {
    "Line 1": ["Versova", "D N Nagar", "Azad Nagar", "Andheri", "Western Express Highway", "Chakala", "Airport Road", "Marol Naka", "Saki Naka", "Asalpha", "Jagruti Nagar", "Ghatkopar"],
    "Line 2A": ["Dahisar East", "Anand Nagar", "Borivali", "Kandarpada", "Mandapeshwar", "Bhayandar", "Naigaon", "Vasai Road"],
    "Line 2B": ["Dahisar East", "Anand Nagar", "Borivali", "Kandarpada", "Mandapeshwar", "Bhayandar", "Naigaon", "Vasai Road"],
    "Line 3": ["Aarey", "Goregaon", "Oshiwara", "Lower Oshiwara", "Andheri West", "Andheri East", "Sakinaka", "Marol Naka", "Airport Road", "Chakala", "Western Express Highway", "Bandra East", "Khar East", "Santacruz", "Vile Parle", "D N Nagar", "Versova"],
    "Line 4": ["Wadala", "Bhakti Park", "Bandra Kurla Complex", "Kurla", "Vidyavihar", "Ghatkopar", "Jagruti Nagar", "Asalpha", "Saki Naka", "Marol Naka", "Airport Road", "Chakala", "Western Express Highway", "Andheri", "Azad Nagar", "D N Nagar", "Versova"],
    "Line 5": ["Thane", "Kalwa", "Mumbra", "Diva", "Kopar", "Dombivli", "Thakurli", "Kalyan"],
    "Line 6": ["Swami Samarth Nagar", "Kurla", "Vidyavihar", "Ghatkopar", "Jagruti Nagar", "Asalpha", "Saki Naka", "Marol Naka", "Airport Road", "Chakala", "Western Express Highway", "Andheri", "Azad Nagar", "D N Nagar", "Versova"],
    "Line 7": ["Dahisar East", "Anand Nagar", "Borivali", "Kandarpada", "Mandapeshwar", "Bhayandar", "Naigaon", "Vasai Road", "Nallasopara", "Virar"],
    "Line 8": ["Colaba", "Gateway of India", "Chhatrapati Shivaji Maharaj Terminus", "Masjid", "Sandhurst Road", "Byculla", "Chinchpokli", "Currey Road", "Parel", "Dadar", "Matunga", "Sion", "Kurla", "Vidyavihar", "Ghatkopar"],
    "Line 9": ["Dahisar East", "Anand Nagar", "Borivali", "Kandarpada", "Mandapeshwar", "Bhayandar", "Naigaon", "Vasai Road", "Nallasopara", "Virar"]
  },
  "Bus": {
    "Line 1": ["Colaba", "Fort", "Churchgate", "Marine Lines", "Charni Road", "Grant Road", "Mumbai Central", "Mahalaxmi", "Lower Parel", "Prabhadevi", "Dadar", "Matunga", "Mahim", "Bandra", "Khar Road", "Santacruz", "Vile Parle", "Andheri", "Jogeshwari", "Ram Mandir", "Goregaon", "Malad", "Kandivali", "Borivali"],
    "Line 2": ["Chhatrapati Shivaji Maharaj Terminus", "Masjid", "Sandhurst Road", "Byculla", "Chinchpokli", "Currey Road", "Parel", "Dadar", "Matunga", "Sion", "Kurla", "Vidyavihar", "Ghatkopar", "Vikhroli", "Kanjurmarg", "Bhandup", "Nahur", "Mulund", "Thane", "Kalwa", "Mumbra", "Diva", "Kopar", "Dombivli", "Thakurli", "Kalyan"]
  },
  "Airport": {
    "Domestic": ["Chhatrapati Shivaji Maharaj Terminus", "Sahar Airport"],
    "International": ["Chhatrapati Shivaji Maharaj Terminus", "Sahar Airport"]
  }
};

router.get("/network", (req, res) => {
  res.json(mumbaiTransportNetwork);
});

module.exports = router;
