const RouteHistory = require("../models/RouteHistory");

// Transport data structure (can be moved to a database later)
const transportData = {
  Train: {
    Western: ['Churchgate', 'Dadar', 'Andheri', 'Borivali'],
    Central: ['CST', 'Dadar', 'Kurla', 'Thane'],
    Harbour: ['CST', 'Kurla', 'Vashi']
  },
  Metro: {
    'Line 1': ['Versova', 'Andheri', 'Ghatkopar'],
    'Line 2A': ['Dahisar', 'Borivali', 'Vasai'],
    'Line 2B': ['Dahisar', 'Borivali', 'Vasai'],
    'Line 3': ['Aarey', 'Andheri', 'Sakinaka']
  },
  Bus: {
    'Line 1': ['Colaba', 'Dadar', 'Thane'],
    'Line 2': ['CST', 'Dadar', 'Thane']
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
