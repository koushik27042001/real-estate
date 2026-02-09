import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import NearMeIcon from "@mui/icons-material/NearMe";

const Hero = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  background: "linear-gradient(90deg, #0b2a5f 0%, #1d4ed8 100%)",
  color: theme.palette.common.white,
}));

const HeroBackdrop = styled(Box)(() => ({
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(180deg, rgba(11,42,95,0.85), rgba(11,42,95,0.4)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.7,
}));

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [activeTab, setActiveTab] = useState("buy");
  const [propertyCategory, setPropertyCategory] = useState("All Residential");
  const [query, setQuery] = useState("");

  const featured = [
    {
      id: 1,
      title: "Luxury Apartment",
      location: "Bangalore, India",
      price: "INR 85 Lakhs",
      img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    },
    {
      id: 2,
      title: "Modern Villa",
      location: "Goa, India",
      price: "INR 2.1 Cr",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 3,
      title: "Cozy Studio",
      location: "Mumbai, India",
      price: "INR 45 Lakhs",
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
  ];

  function onSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab) params.set("mode", activeTab);
    if (propertyCategory) params.set("category", propertyCategory);
    if (query) params.set("q", query);
    navigate(`/properties?${params.toString()}`);
  }

  function handleNearMe() {
    if (!navigator.geolocation) {
      window.alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const params = new URLSearchParams();
        params.set("lat", latitude);
        params.set("lng", longitude);
        params.set("near", "true");
        navigate(`/properties?${params.toString()}`);
      },
      () => {
        window.alert("Location permission denied");
      }
    );
  }

  function handleVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      window.alert("Voice search not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const params = new URLSearchParams();
      params.set("query", transcript);
      navigate(`/properties?${params.toString()}`);
    };

    recognition.onerror = () => {
      window.alert("Voice recognition error");
    };
  }

  const tabs = [
    { value: "buy", label: "Buy" },
    { value: "rent", label: "Rent" },
    { value: "new launch", label: "New Launch", dot: true },
    { value: "commercial", label: "Commercial" },
    { value: "plots/land", label: "Plots/Land" },
    { value: "projects", label: "Projects" },
    { value: "post property (free)", label: "Post Property", free: true },
  ];

  const placeholders = {
    buy: 'Search "3 BHK for sale in Mumbai"',
    rent: 'Search "2 BHK for rent in Pune"',
    "new launch": 'Search "New launch in Hyderabad"',
    commercial: 'Search "Office space in Bengaluru"',
    "plots/land": 'Search "Land in Gurgaon"',
    projects: 'Search "Ready to move projects"',
    "post property (free)": "Post your property for free",
  };

  const activeIndex = useMemo(
    () => Math.max(0, tabs.findIndex((tab) => tab.value === activeTab)),
    [activeTab, tabs]
  );

  return (
    <Box>
      <Hero>
        <HeroBackdrop />
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Stack spacing={2} alignItems={{ xs: "flex-start", md: "center" }} textAlign={{ xs: "left", md: "center" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label="99acres Property Expo" color="default" sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "white" }} />
              <Chip label="SELL" size="small" sx={{ bgcolor: "#FBBF24", fontWeight: 700 }} />
              <Chip label="BUY" size="small" sx={{ bgcolor: "#FBBF24", fontWeight: 700 }} />
              <Chip label="PAY MORE GET EXTRA" size="small" sx={{ bgcolor: "#FBBF24", fontWeight: 700 }} />
            </Stack>
            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
              Supported by: HDFC, SBI, ICICI
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
              Mumbai, Delhi, Bengaluru | 10-12 Nov
            </Typography>
            <Chip label="Limited time offer" color="error" size="small" sx={{ fontWeight: 700 }} />
          </Stack>
        </Container>

        <Container sx={{ position: "relative", zIndex: 2, mt: 6 }}>
          <Card elevation={12} sx={{ borderRadius: 3, p: { xs: 2, md: 3 } }}>
            <Box id="inPageSearchForm" className="InPageTabs" sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeIndex}
                onChange={(_, value) => setActiveTab(tabs[value].value)}
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{ sx: { height: 3, borderRadius: 2 } }}
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    id={`inPageSearchForm_${tab.value}`}
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                          {tab.label}
                        </Typography>
                        {tab.dot ? <Box className="tab__redDot" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "error.main" }} /> : null}
                        {tab.free ? (
                          <Chip label="Free" size="small" color="success" sx={{ height: 18, fontSize: 10, fontWeight: 700 }} />
                        ) : null}
                      </Stack>
                    }
                  />
                ))}
              </Tabs>
            </Box>

            <Box component="form" onSubmit={onSearch} sx={{ mt: 2 }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
                <FormControl sx={{ minWidth: { xs: "100%", md: 220 } }} size="small">
                  <Select
                    value={propertyCategory}
                    onChange={(e) => setPropertyCategory(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="All Residential">All Residential</MenuItem>
                    <MenuItem value="Residential Project">Residential Project</MenuItem>
                    <MenuItem value="Apartment">Apartment</MenuItem>
                    <MenuItem value="Villa">Villa</MenuItem>
                    <MenuItem value="Plot/Land">Plot/Land</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholders[activeTab]}
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<NearMeIcon />}
                  className="pageComponent inPageSearchBox__nearMe"
                  onClick={handleNearMe}
                >
                  Near Me
                </Button>

                <Button variant="outlined" size="small" startIcon={<MicIcon />} onClick={handleVoiceSearch}>
                  Voice Search
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ minWidth: isMdUp ? 160 : "100%" }}
                >
                  Search
                </Button>
              </Stack>
            </Box>
          </Card>
        </Container>
      </Hero>

      <Container sx={{ py: 8 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700}>
            Featured Properties
          </Typography>
          <Button component={Link} to="/properties" variant="text">
            Explore all properties -&gt;
          </Button>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {featured.map((p) => (
            <Card key={p.id} sx={{ flex: 1, overflow: "hidden" }}>
              <Box
                component={Link}
                to={`/property/${p.id}`}
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <Box component="img" src={p.img} alt={p.title} sx={{ width: "100%", height: 200, objectFit: "cover" }} />
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="h6" fontWeight={600}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.location}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ mt: 1 }}>
                    {p.price}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Stack>
      </Container>

      <Box sx={{ bgcolor: "white", py: 8 }}>
        <Container>
          <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 5 }}>
            Why Choose Our Platform?
          </Typography>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box textAlign="center" flex={1}>
              <Typography variant="h6" fontWeight={600}>
                Verified Listings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                All listings are verified by our team.
              </Typography>
            </Box>

            <Box textAlign="center" flex={1}>
              <Typography variant="h6" fontWeight={600}>
                Transparent Pricing
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Clear fees and no hidden charges.
              </Typography>
            </Box>

            <Box textAlign="center" flex={1}>
              <Typography variant="h6" fontWeight={600}>
                Trusted Agents
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Work with certified local agents.
              </Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center" justifyContent="center" sx={{ mt: 6 }}>
            <Stack direction="row" spacing={4}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight={700}>
                  25k+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Listings
                </Typography>
              </Box>

              <Box textAlign="center">
                <Typography variant="h4" fontWeight={700}>
                  50k+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Happy Customers
                </Typography>
              </Box>

              <Box textAlign="center">
                <Typography variant="h4" fontWeight={700}>
                  4.8/5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Box component="img" src="https://placehold.co/140x48?text=Partner+1" alt="partner 1" sx={{ height: 32 }} />
              <Box component="img" src="https://placehold.co/140x48?text=Partner+2" alt="partner 2" sx={{ height: 32 }} />
              <Box component="img" src="https://placehold.co/140x48?text=Partner+3" alt="partner 3" sx={{ height: 32 }} />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700}>
          Ready to Sell or Rent Your Property?
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, opacity: 0.9 }}>
          List your property and reach thousands of buyers
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button component={Link} to="/register?role=owner" variant="contained" color="inherit">
            Register as Owner
          </Button>
          <Button component={Link} to="/register?role=agent" variant="outlined" color="inherit">
            Register as Agent
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
