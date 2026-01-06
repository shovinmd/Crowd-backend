const RouteHistory = require("../models/RouteHistory");

// Transport data structure (can be moved to a database later)
const transportData = {
  Train: {
    Western: ['Churchgate', 'Marine Lines', 'Dadar', 'Bandra', 'Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali', 'Borivali', 'Mira Road', 'Bhayander', 'Vasai Road', 'Nalasopara', 'Virar'],
    Central: ['CSMT', 'Byculla', 'Dadar', 'Kurla', 'Ghatkopar', 'Vikhroli', 'Bhandup', 'Mulund', 'Thane', 'Dombivli', 'Kalyan'],
    Harbour: ['CSMT', 'Masjid', 'Sandhurst Road', 'Dockyard Road', 'Reay Road', 'Cotton Green', 'Kurla', 'Chembur', 'Vashi', 'Nerul', 'Belapur', 'Kharghar', 'Panvel']
  },
  Metro: {
    'Line 1': ['Versova', 'DN Nagar', 'Andheri', 'Western Express', 'Airport Road', 'Marol Naka', 'Saki Naka', 'Asalpha', 'Jagruti Nagar', 'Ghatkopar'],
    'Line 2A': ['Dahisar East', 'Ovaripada', 'Magathane', 'Poisar', 'Akurli', 'Kurla West', 'Dindoshi', 'Goregaon East', 'Bangur Nagar'],
    'Line 2B': ['DN Nagar', 'Andheri West', 'Juhu', 'Santacruz', 'Khar', 'Bandra'],
    'Line 3': ['Aarey', 'SEEPZ', 'Marol', 'MIDC', 'Sakinaka']
  },
  Bus: {
    'Line 1': ['Colaba', 'Churchgate', 'Fort', 'CST', 'Dadar', 'Thane'],
    'Line 2': ['CST', 'Byculla', 'Dadar', 'Sion', 'Thane']
  },
  Airport: {
    Domestic: ['Terminal 1', 'Terminal 2'],
    International: ['Terminal 2']
  }
};

exports.getTransportModes = async (req, res) => {
  try {
    const modes = Object.keys(transportData);
    res.status(200).json({ modes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransportLines = async (req, res) => {
  try {
    const { mode } = req.params;
    const lines = transportData[mode] ? Object.keys(transportData[mode]) : [];
    res.status(200).json({ lines });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransportStations = async (req, res) => {
  try {
    const { mode, line } = req.params;
    const stations = transportData[mode] && transportData[mode][line] ? transportData[mode][line] : [];
    res.status(200).json({ stations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRouteHistory = async (req, res) => {
  try {
    const routes = await RouteHistory.find({})
      .sort({ avgCrowdScore: -1 })
      .limit(20);
    res.status(200).json({ routes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPopularRoutes = async (req, res) => {
  try {
    const popularRoutes = await RouteHistory.find({})
      .sort({ count: -1 })
      .limit(10);
    res.status(200).json({ popularRoutes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransportNetwork = async (req, res) => {
  try {
    res.status(200).json({ network: transportData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
