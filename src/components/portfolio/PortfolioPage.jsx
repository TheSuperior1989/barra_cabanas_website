import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PortfolioPage.css';

// Aerial Views
import aerialBeachfrontResort from '../../assets/images/Houses/aerial-beachfront-resort.jpg';
import aerialOceanfrontComplex from '../../assets/images/Houses/aerial-oceanfront-complex.jpg';
import aerialPoolBalconies from '../../assets/images/Houses/aerial-pool-balconies.jpg';
import aerialRooftopPools from '../../assets/images/Houses/aerial-rooftop-pools.jpg';

// Exterior & Beach Views
import exteriorBeachfrontConstruction from '../../assets/images/Houses/exterior-beachfront-construction.jpg';
import exteriorBalconiesPools from '../../assets/images/Houses/exterior-balconies-pools.jpg';
import exteriorReceptionEntrance from '../../assets/images/Houses/exterior-reception-entrance.jpg';
import beachPalmTreesView from '../../assets/images/Houses/beach-palm-trees-view.jpg';
import beachLoungersOceanfront from '../../assets/images/Houses/beach-loungers-oceanfront.jpg';
import beachAccessPalmtree from '../../assets/images/Houses/beach-access-palmtree.jpg';
import beachBarPalmtrees from '../../assets/images/Houses/beach-bar-palmtrees.jpg';
import gardenPathwayPebbles from '../../assets/images/Houses/garden-pathway-pebbles.jpg';
import mainCourtyardPaving from '../../assets/images/Houses/main-courtyard-paving.jpg';
import poolDeckAerialView from '../../assets/images/Houses/pool-deck-aerial-view.jpg';

// Entrance & Reception
import entranceCourtyardDusk from '../../assets/images/Houses/entrance-courtyard-dusk.jpg';
import entranceCourtyardPlants from '../../assets/images/Houses/entrance-courtyard-plants.jpg';
import entranceGateSign from '../../assets/images/Houses/entrance-gate-sign.jpg';
import entranceWalkwayTropical from '../../assets/images/Houses/entrance-walkway-tropical.jpg';
import receptionDeskDetail from '../../assets/images/Houses/reception-desk-detail.jpg';
import receptionLobbyInterior from '../../assets/images/Houses/reception-lobby-interior.jpg';
import receptionSignExterior from '../../assets/images/Houses/reception-sign-exterior.jpg';

// Balconies & Outdoor Spaces
import balconyCornerBeachview from '../../assets/images/Houses/balcony-corner-beachview.jpg';
import balconyDaybedOceanview from '../../assets/images/Houses/balcony-daybed-oceanview.jpg';
import balconyDeckOceanview from '../../assets/images/Houses/balcony-deck-oceanview.jpg';
import balconyDiningOceanview from '../../assets/images/Houses/balcony-dining-oceanview.jpg';
import balconyExteriorDetail from '../../assets/images/Houses/balcony-exterior-detail.jpg';
import balconyNarrowOceanview from '../../assets/images/Houses/balcony-narrow-oceanview.jpg';
import balconyWalkwayOceanview from '../../assets/images/Houses/balcony-walkway-oceanview.jpg';
import rooftopLoungeChairs from '../../assets/images/Houses/rooftop-lounge-chairs.jpg';
import rooftopTerracePatio from '../../assets/images/Houses/rooftop-terrace-patio.jpg';
import rooftopDiningOceanview from '../../assets/images/Houses/rooftop-dining-oceanview.jpg';

// Pools
import infinityPoolOceanview from '../../assets/images/Houses/infinity-pool-oceanview.jpg';
import poolCourtyardLoungers from '../../assets/images/Houses/pool-courtyard-loungers.jpg';
import poolInteriorCourtyard from '../../assets/images/Houses/pool-interior-courtyard.jpg';

// Bedrooms
import bedroomSuite02 from '../../assets/images/Houses/bedroom-suite-02.jpg';
import bedroomSuite03 from '../../assets/images/Houses/bedroom-suite-03.jpg';
import bedroomSuite04 from '../../assets/images/Houses/bedroom-suite-04.jpg';
import bedroomSuite05 from '../../assets/images/Houses/bedroom-suite-05.jpg';
import bedroomSuite06 from '../../assets/images/Houses/bedroom-suite-06.jpg';
import bedroomSuite07 from '../../assets/images/Houses/bedroom-suite-07.jpg';
import bedroomSuite08 from '../../assets/images/Houses/bedroom-suite-08.jpg';
import bedroomSuite09 from '../../assets/images/Houses/bedroom-suite-09.jpg';
import bedroomSuite10 from '../../assets/images/Houses/bedroom-suite-10.jpg';
import bedroomSuite11 from '../../assets/images/Houses/bedroom-suite-11.jpg';
import bedroomSuite12 from '../../assets/images/Houses/bedroom-suite-12.jpg';
import bedroomSuite13 from '../../assets/images/Houses/bedroom-suite-13.jpg';
import bedroomSuite14 from '../../assets/images/Houses/bedroom-suite-14.jpg';
import bedroomSuite15 from '../../assets/images/Houses/bedroom-suite-15.jpg';
import bedroomSuiteInterior from '../../assets/images/Houses/bedroom-suite-interior.jpg';
import bedroomSuiteTwin from '../../assets/images/Houses/bedroom-suite-twin.jpg';
import bedroomHeadboardCloseup from '../../assets/images/Houses/bedroom-headboard-closeup.jpg';
import bedroomStorageUnit from '../../assets/images/Houses/bedroom-storage-unit.jpg';
import beddingDetailWhite from '../../assets/images/Houses/bedding-detail-white.jpg';

// Living Spaces
import loungeBalconyOceanview from '../../assets/images/Houses/lounge-balcony-oceanview.jpg';
import loungeTerraceOceanview from '../../assets/images/Houses/lounge-terrace-oceanview.jpg';
import livingRoomSofa02 from '../../assets/images/Houses/living-room-sofa-02.jpg';
import livingRoomSofaShelving from '../../assets/images/Houses/living-room-sofa-shelving.jpg';
import livingRoomTvLounge from '../../assets/images/Houses/living-room-tv-lounge.jpg';
import livingRoomLounge03 from '../../assets/images/Houses/iving-room-lounge-03.jpg';
import livingDiningOpenplan from '../../assets/images/Houses/living-dining-openplan.jpg';

// Kitchen & Dining
import kitchenGalleyWhite from '../../assets/images/Houses/kitchen-galley-white.jpg';
import kitchenBarGlassware from '../../assets/images/Houses/kitchen-bar-glassware.jpg';
import kitchenDiningHallway from '../../assets/images/Houses/kitchen-dining-hallway.jpg';
import kitchenHallwayModern from '../../assets/images/Houses/kitchen-hallway-modern.jpg';
import diningKitchenOpenplan from '../../assets/images/Houses/dining-kitchen-openplan.jpg';
import diningKitchenBarstool from '../../assets/images/Houses/dining-kitchen-barstool.jpg';
import diningKitchenRustic from '../../assets/images/Houses/dining-kitchen-rustic.jpg';
import kitchenDiningIsland from '../../assets/images/Houses/kitchen-dining-island.jpg';
import kitchenetteFridgeStorage from '../../assets/images/Houses/kitchenette-fridge-storage.jpg';
import kitchenetteSinkWhite from '../../assets/images/Houses/kitchenette-sink-white.jpg';
import kitchenetteCompactWhite from '../../assets/images/Houses/kitchenette-compact-white.jpg';
import kitchenetteMinimalWhite from '../../assets/images/Houses/kitchenette-minimal-white.jpg';

// Bathrooms
import bathroomVanity01 from '../../assets/images/Houses/bathroom-vanity-01.jpg';
import bathroomVanity02 from '../../assets/images/Houses/bathroom-vanity-02.jpg';
import bathroomVanity03 from '../../assets/images/Houses/bathroom-vanity-03.jpg';
import bathroomVanity04 from '../../assets/images/Houses/bathroom-vanity-04.jpg';
import bathroomVanity05 from '../../assets/images/Houses/bathroom-vanity-05.jpg';
import bathroomVanity06 from '../../assets/images/Houses/bathroom-vanity-06.jpg';
import bathroomVanity07 from '../../assets/images/Houses/bathroom-vanity-07.jpg';
import bathroomVanity08 from '../../assets/images/Houses/bathroom-vanity-08.jpg';
import bathroomVanity09 from '../../assets/images/Houses/bathroom-vanity-09.jpg';
import bathroomVanity10 from '../../assets/images/Houses/bathroom-vanity-10.jpg';
import bathroomSinkCloseup from '../../assets/images/Houses/bathroom-sink-closeup.jpg';
import bathroomToiletAerial from '../../assets/images/Houses/bathroom-toilet-aerial.jpg';
import bathroomToiletOverhead from '../../assets/images/Houses/bathroom-toilet-overhead.jpg';
import showerEnclosure02 from '../../assets/images/Houses/shower-enclosure-02.jpg';
import showerEnclosureGlass from '../../assets/images/Houses/shower-enclosure-glass.jpg';
import showerBathroomAngle from '../../assets/images/Houses/shower-bathroom-angle.jpg';

// Corridors & Details
import corridorExteriorLong from '../../assets/images/Houses/corridor-exterior-long.jpg';
import corridorWhiteExterior from '../../assets/images/Houses/corridor-white-exterior.jpg';
import entranceCorridorWhite from '../../assets/images/Houses/entrance-corridor-white.jpg';
import shelfBeachDecor from '../../assets/images/Houses/shelf-beach-decor.jpg';
import storageUnitMirror from '../../assets/images/Houses/storage-unit-mirror.jpg';

// Gallery items showcasing Barra Cabanas accommodations and experiences
const galleryItems = [
  // Exterior & Beach Views
  {
    id: 1,
    title: 'Beachfront Paradise',
    category: 'Exterior Views',
    image: exteriorBeachfrontConstruction,
    description: '6-bedroom luxury beachfront holiday house with private splash pool, under-cover parking, and boat launch access. No 4x4 needed.',
    location: 'Barra, Mozambique',
    date: 'Beachfront Property',
    tags: ['Beachfront', '6 Bedrooms', 'Pool']
  },
  {
    id: 2,
    title: 'Pristine Beach Access',
    category: 'Beach & Views',
    image: beachPalmTreesView,
    description: 'Direct beachfront access with palm trees and pristine white sand. Sun loungers on the porch for ultimate relaxation.',
    location: 'Barra Beach',
    date: 'Beach Access',
    tags: ['Beach', 'Ocean Views', 'Palm Trees']
  },
  {
    id: 3,
    title: 'Beachfront Relaxation',
    category: 'Beach & Views',
    image: beachLoungersOceanfront,
    description: 'Beach loungers with direct oceanfront views. Daily housekeeping service ensures your comfort throughout your stay.',
    location: 'Beach Area',
    date: 'Beach Facilities',
    tags: ['Beach Loungers', 'Ocean', 'Relaxation']
  },
  {
    id: 4,
    title: 'Garden Pathways',
    category: 'Outdoor Spaces',
    image: gardenPathwayPebbles,
    description: 'Beautiful pebblestone pathways connecting the property. Braai facilities on the veranda for outdoor dining experiences.',
    location: 'Garden & Outdoor',
    date: 'Outdoor Amenities',
    tags: ['Garden', 'Braai', 'Outdoor']
  },
  {
    id: 5,
    title: 'Main Courtyard',
    category: 'Outdoor Spaces',
    image: mainCourtyardPaving,
    description: 'Spacious courtyard with elegant paving, perfect for outdoor gatherings and relaxation.',
    location: 'Courtyard',
    date: 'Outdoor Space',
    tags: ['Courtyard', 'Paving', 'Outdoor']
  },
  {
    id: 6,
    title: 'Pool Deck Aerial View',
    category: 'Outdoor Spaces',
    image: poolDeckAerialView,
    description: 'Stunning aerial view of the pool deck area with ocean views.',
    location: 'Pool Area',
    date: 'Pool Facilities',
    tags: ['Pool', 'Deck', 'Aerial View']
  },

  // Balconies & Outdoor Spaces
  {
    id: 7,
    title: 'Corner Beach View',
    category: 'Balconies',
    image: balconyCornerBeachview,
    description: 'Corner balcony with stunning beachfront views.',
    location: 'Balcony',
    date: 'Ocean Views',
    tags: ['Balcony', 'Beach View', 'Corner']
  },
  {
    id: 8,
    title: 'Daybed Ocean View',
    category: 'Balconies',
    image: balconyDaybedOceanview,
    description: 'Relaxing daybed on the balcony with panoramic ocean views.',
    location: 'Balcony',
    date: 'Relaxation',
    tags: ['Daybed', 'Ocean View', 'Balcony']
  },
  {
    id: 9,
    title: 'Deck Ocean View',
    category: 'Balconies',
    image: balconyDeckOceanview,
    description: 'Spacious deck area with unobstructed ocean views.',
    location: 'Deck',
    date: 'Ocean Views',
    tags: ['Deck', 'Ocean', 'Balcony']
  },
  {
    id: 10,
    title: 'Dining Ocean View',
    category: 'Balconies',
    image: balconyDiningOceanview,
    description: 'Outdoor dining area on the balcony with breathtaking ocean views.',
    location: 'Balcony Dining',
    date: 'Outdoor Dining',
    tags: ['Dining', 'Ocean View', 'Balcony']
  },
  {
    id: 11,
    title: 'Balcony Exterior Detail',
    category: 'Balconies',
    image: balconyExteriorDetail,
    description: 'Architectural details of the exterior balcony design.',
    location: 'Balcony',
    date: 'Architecture',
    tags: ['Balcony', 'Exterior', 'Design']
  },
  {
    id: 12,
    title: 'Narrow Ocean View',
    category: 'Balconies',
    image: balconyNarrowOceanview,
    description: 'Intimate balcony space with ocean views.',
    location: 'Balcony',
    date: 'Ocean Views',
    tags: ['Balcony', 'Ocean', 'Intimate']
  },
  {
    id: 13,
    title: 'Walkway Ocean View',
    category: 'Balconies',
    image: balconyWalkwayOceanview,
    description: 'Balcony walkway with stunning ocean panoramas.',
    location: 'Balcony Walkway',
    date: 'Ocean Views',
    tags: ['Walkway', 'Ocean', 'Balcony']
  },
  {
    id: 14,
    title: 'Rooftop Lounge Chairs',
    category: 'Balconies',
    image: rooftopLoungeChairs,
    description: 'Rooftop lounge area with comfortable seating and ocean views.',
    location: 'Rooftop',
    date: 'Relaxation',
    tags: ['Rooftop', 'Lounge', 'Ocean View']
  },
  {
    id: 15,
    title: 'Rooftop Terrace',
    category: 'Balconies',
    image: rooftopTerracePatio,
    description: 'Spacious rooftop terrace patio for entertaining and relaxation.',
    location: 'Rooftop Terrace',
    date: 'Entertainment',
    tags: ['Rooftop', 'Terrace', 'Patio']
  },

  // Bedrooms
  {
    id: 16,
    title: 'En-Suite Bedroom 1',
    category: 'Bedrooms',
    image: bedroomSuite02,
    description: 'Spacious en-suite bedroom with air-conditioning and elegant coastal design.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Air-Conditioned', 'Bedroom']
  },
  {
    id: 17,
    title: 'En-Suite Bedroom 2',
    category: 'Bedrooms',
    image: bedroomSuite03,
    description: 'Comfortable en-suite bedroom with modern amenities.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Modern', 'Bedroom']
  },
  {
    id: 18,
    title: 'En-Suite Bedroom 3',
    category: 'Bedrooms',
    image: bedroomSuite04,
    description: 'Beautifully appointed en-suite bedroom with queen bed.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Queen Bed', 'Bedroom']
  },
  {
    id: 19,
    title: 'En-Suite Bedroom 4',
    category: 'Bedrooms',
    image: bedroomSuite05,
    description: 'Elegant en-suite bedroom with air-conditioning and coastal decor.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Air-Conditioned', 'Bedroom']
  },
  {
    id: 20,
    title: 'En-Suite Bedroom 5',
    category: 'Bedrooms',
    image: bedroomSuite06,
    description: 'Spacious bedroom suite with modern furnishings.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Modern', 'Bedroom']
  },
  {
    id: 21,
    title: 'En-Suite Bedroom 6',
    category: 'Bedrooms',
    image: bedroomSuite07,
    description: 'Comfortable bedroom with en-suite bathroom and air-conditioning.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Air-Conditioned', 'Bedroom']
  },
  {
    id: 22,
    title: 'En-Suite Bedroom 7',
    category: 'Bedrooms',
    image: bedroomSuite08,
    description: 'Beautifully designed bedroom suite with coastal charm.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Coastal', 'Bedroom']
  },
  {
    id: 23,
    title: 'En-Suite Bedroom 8',
    category: 'Bedrooms',
    image: bedroomSuite09,
    description: 'Elegant bedroom with modern amenities and en-suite bathroom.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Modern', 'Bedroom']
  },
  {
    id: 24,
    title: 'En-Suite Bedroom 9',
    category: 'Bedrooms',
    image: bedroomSuite10,
    description: 'Spacious bedroom suite with air-conditioning.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Air-Conditioned', 'Bedroom']
  },
  {
    id: 25,
    title: 'En-Suite Bedroom 10',
    category: 'Bedrooms',
    image: bedroomSuite11,
    description: 'Comfortable bedroom with elegant furnishings and en-suite bathroom.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['En-Suite', 'Elegant', 'Bedroom']
  },
  {
    id: 26,
    title: 'Bedroom Interior',
    category: 'Bedrooms',
    image: bedroomSuiteInterior,
    description: 'Interior view of spacious bedroom suite.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['Interior', 'Spacious', 'Bedroom']
  },
  {
    id: 27,
    title: 'Twin Bedroom',
    category: 'Bedrooms',
    image: bedroomSuiteTwin,
    description: 'Twin bedroom suite perfect for children or friends.',
    location: 'Bedroom',
    date: 'Accommodation',
    tags: ['Twin Beds', 'En-Suite', 'Bedroom']
  },
  {
    id: 28,
    title: 'Bedroom Headboard Detail',
    category: 'Bedrooms',
    image: bedroomHeadboardCloseup,
    description: 'Elegant headboard design detail.',
    location: 'Bedroom',
    date: 'Interior Design',
    tags: ['Headboard', 'Design', 'Detail']
  },
  {
    id: 29,
    title: 'Bedroom Storage',
    category: 'Bedrooms',
    image: bedroomStorageUnit,
    description: 'Built-in storage unit in bedroom.',
    location: 'Bedroom',
    date: 'Storage',
    tags: ['Storage', 'Built-in', 'Bedroom']
  },

  // Living Spaces
  {
    id: 30,
    title: 'Ocean View Lounge',
    category: 'Living Spaces',
    image: loungeBalconyOceanview,
    description: 'Covered lounge area with panoramic ocean views, Samsung 65" 4K Smart TV, and uncapped Starlink WiFi.',
    location: 'Living Area',
    date: 'Entertainment',
    tags: ['Ocean View', 'Smart TV', 'WiFi']
  },
  {
    id: 31,
    title: 'Living Room Sofa',
    category: 'Living Spaces',
    image: livingRoomSofa02,
    description: 'Comfortable living room with modern sofa and coastal decor.',
    location: 'Living Room',
    date: 'Relaxation',
    tags: ['Sofa', 'Living Room', 'Comfort']
  },
  {
    id: 32,
    title: 'Living Room with Shelving',
    category: 'Living Spaces',
    image: livingRoomSofaShelving,
    description: 'Spacious living area with built-in shelving and comfortable seating.',
    location: 'Living Room',
    date: 'Entertainment',
    tags: ['Shelving', 'Living Room', 'Storage']
  },
  {
    id: 33,
    title: 'TV Lounge',
    category: 'Living Spaces',
    image: livingRoomTvLounge,
    description: 'Entertainment lounge with Samsung 65" 4K Smart TV and ocean views.',
    location: 'TV Lounge',
    date: 'Entertainment',
    tags: ['TV', 'Lounge', 'Entertainment']
  },

  // Kitchen & Dining
  {
    id: 34,
    title: 'Modern Kitchen',
    category: 'Kitchen & Dining',
    image: kitchenGalleyWhite,
    description: 'Fully equipped modern kitchen with gas stove, airfryer, and all essentials.',
    location: 'Kitchen',
    date: 'Cooking',
    tags: ['Kitchen', 'Modern', 'Fully Equipped']
  },
  {
    id: 35,
    title: 'Kitchen Bar',
    category: 'Kitchen & Dining',
    image: kitchenBarGlassware,
    description: 'Kitchen bar area with glassware and serving space.',
    location: 'Kitchen Bar',
    date: 'Dining',
    tags: ['Bar', 'Glassware', 'Kitchen']
  },
  {
    id: 36,
    title: 'Kitchen Dining Hallway',
    category: 'Kitchen & Dining',
    image: kitchenDiningHallway,
    description: 'Open hallway connecting kitchen and dining areas.',
    location: 'Kitchen Hallway',
    date: 'Layout',
    tags: ['Hallway', 'Kitchen', 'Dining']
  },
  {
    id: 37,
    title: 'Kitchen Hallway',
    category: 'Kitchen & Dining',
    image: kitchenHallwayModern,
    description: 'Modern kitchen hallway with sleek design.',
    location: 'Kitchen',
    date: 'Design',
    tags: ['Hallway', 'Modern', 'Kitchen']
  },
  {
    id: 38,
    title: 'Open Plan Dining',
    category: 'Kitchen & Dining',
    image: diningKitchenOpenplan,
    description: 'Open plan kitchen and dining area perfect for family meals.',
    location: 'Dining Area',
    date: 'Dining',
    tags: ['Open Plan', 'Dining', 'Kitchen']
  },
  {
    id: 39,
    title: 'Kitchenette Storage',
    category: 'Kitchen & Dining',
    image: kitchenetteFridgeStorage,
    description: 'Kitchenette with fridge and storage space.',
    location: 'Kitchenette',
    date: 'Storage',
    tags: ['Kitchenette', 'Fridge', 'Storage']
  },
  {
    id: 40,
    title: 'Kitchenette Sink',
    category: 'Kitchen & Dining',
    image: kitchenetteSinkWhite,
    description: 'Clean white kitchenette sink area.',
    location: 'Kitchenette',
    date: 'Amenities',
    tags: ['Sink', 'Kitchenette', 'White']
  },

  // Bathrooms
  {
    id: 41,
    title: 'Bathroom Vanity 1',
    category: 'Bathrooms',
    image: bathroomVanity01,
    description: 'Modern bathroom vanity with elegant fixtures.',
    location: 'Bathroom',
    date: 'Amenities',
    tags: ['Vanity', 'Bathroom', 'Modern']
  },
  {
    id: 42,
    title: 'Bathroom Vanity 2',
    category: 'Bathrooms',
    image: bathroomVanity02,
    description: 'Stylish bathroom vanity with contemporary design.',
    location: 'Bathroom',
    date: 'Amenities',
    tags: ['Vanity', 'Bathroom', 'Contemporary']
  },
  {
    id: 43,
    title: 'Bathroom Vanity 3',
    category: 'Bathrooms',
    image: bathroomVanity03,
    description: 'Elegant bathroom vanity with modern amenities.',
    location: 'Bathroom',
    date: 'Amenities',
    tags: ['Vanity', 'Bathroom', 'Elegant']
  },
  {
    id: 44,
    title: 'Bathroom Vanity 4',
    category: 'Bathrooms',
    image: bathroomVanity04,
    description: 'Spacious bathroom vanity with storage.',
    location: 'Bathroom',
    date: 'Amenities',
    tags: ['Vanity', 'Bathroom', 'Storage']
  },
  {
    id: 45,
    title: 'Bathroom Vanity 5',
    category: 'Bathrooms',
    image: bathroomVanity05,
    description: 'Modern bathroom vanity with sleek design.',
    location: 'Bathroom',
    date: 'Amenities',
    tags: ['Vanity', 'Bathroom', 'Sleek']
  },
  {
    id: 46,
    title: 'Bathroom Sink Detail',
    category: 'Bathrooms',
    image: bathroomSinkCloseup,
    description: 'Close-up of modern bathroom sink fixtures.',
    location: 'Bathroom',
    date: 'Details',
    tags: ['Sink', 'Bathroom', 'Detail']
  },
  {
    id: 47,
    title: 'Bathroom Aerial View',
    category: 'Bathrooms',
    image: bathroomToiletAerial,
    description: 'Aerial view of bathroom layout.',
    location: 'Bathroom',
    date: 'Layout',
    tags: ['Aerial', 'Bathroom', 'Layout']
  },
  {
    id: 48,
    title: 'Bathroom Overhead View',
    category: 'Bathrooms',
    image: bathroomToiletOverhead,
    description: 'Overhead view of bathroom design.',
    location: 'Bathroom',
    date: 'Layout',
    tags: ['Overhead', 'Bathroom', 'Design']
  },
  {
    id: 49,
    title: 'Shower Enclosure 1',
    category: 'Bathrooms',
    image: showerEnclosure02,
    description: 'Modern shower enclosure with glass doors.',
    location: 'Bathroom',
    date: 'Amenities',
    tags: ['Shower', 'Bathroom', 'Modern']
  },
  {
    id: 50,
    title: 'Glass Shower Enclosure',
    category: 'Bathrooms',
    image: showerEnclosureGlass,
    description: 'Elegant glass shower enclosure.',
    location: 'Bathroom',
    date: 'Amenities',
    tags: ['Shower', 'Glass', 'Bathroom']
  },

  // Corridors & Details
  {
    id: 51,
    title: 'Exterior Corridor',
    category: 'Interior Details',
    image: corridorExteriorLong,
    description: 'Long exterior corridor connecting different areas.',
    location: 'Corridor',
    date: 'Architecture',
    tags: ['Corridor', 'Exterior', 'Walkway']
  },
  {
    id: 52,
    title: 'White Exterior Corridor',
    category: 'Interior Details',
    image: corridorWhiteExterior,
    description: 'Clean white exterior corridor design.',
    location: 'Corridor',
    date: 'Architecture',
    tags: ['Corridor', 'White', 'Exterior']
  },
  {
    id: 53,
    title: 'Entrance Corridor',
    category: 'Interior Details',
    image: entranceCorridorWhite,
    description: 'Welcoming entrance corridor with white walls.',
    location: 'Entrance',
    date: 'Architecture',
    tags: ['Entrance', 'Corridor', 'White']
  },
  {
    id: 54,
    title: 'Beach Decor',
    category: 'Interior Details',
    image: shelfBeachDecor,
    description: 'Coastal-themed decorative shelf with beach accents.',
    location: 'Interior',
    date: 'Decor',
    tags: ['Decor', 'Beach', 'Shelf']
  },
  {
    id: 55,
    title: 'Storage Unit with Mirror',
    category: 'Interior Details',
    image: storageUnitMirror,
    description: 'Functional storage unit with mirror.',
    location: 'Interior',
    date: 'Storage',
    tags: ['Storage', 'Mirror', 'Unit']
  },
  // NEW AERIAL VIEWS
  {
    id: 56,
    title: 'Aerial Beachfront Resort',
    category: 'Aerial Views',
    image: aerialBeachfrontResort,
    description: 'Stunning aerial view of the beachfront resort with turquoise water.',
    location: 'Barra Beach',
    date: 'Aerial Photography',
    tags: ['Aerial', 'Beachfront', 'Ocean']
  },
  {
    id: 57,
    title: 'Aerial Oceanfront Complex',
    category: 'Aerial Views',
    image: aerialOceanfrontComplex,
    description: 'Aerial perspective of the resort complex along the pristine coastline.',
    location: 'Barra Beach',
    date: 'Aerial Photography',
    tags: ['Aerial', 'Complex', 'Coastline']
  },
  {
    id: 58,
    title: 'Aerial Pool Balconies',
    category: 'Aerial Views',
    image: aerialPoolBalconies,
    description: 'Aerial angle showcasing multiple pool balconies.',
    location: 'Resort',
    date: 'Aerial Photography',
    tags: ['Aerial', 'Pools', 'Balconies']
  },
  {
    id: 59,
    title: 'Aerial Rooftop Pools',
    category: 'Aerial Views',
    image: aerialRooftopPools,
    description: 'Overhead aerial view of building rooftops with pools.',
    location: 'Resort',
    date: 'Aerial Photography',
    tags: ['Aerial', 'Rooftop', 'Pools']
  },
  // NEW EXTERIOR VIEWS
  {
    id: 60,
    title: 'Exterior Balconies & Pools',
    category: 'Exterior Views',
    image: exteriorBalconiesPools,
    description: 'Multi-level building with stunning blue balcony pools.',
    location: 'Resort',
    date: 'Exterior',
    tags: ['Exterior', 'Balconies', 'Pools']
  },
  {
    id: 61,
    title: 'Reception Entrance',
    category: 'Exterior Views',
    image: exteriorReceptionEntrance,
    description: 'White exterior building with reception entrance and balconies.',
    location: 'Reception',
    date: 'Exterior',
    tags: ['Exterior', 'Reception', 'Entrance']
  },
  // NEW BEACH AREAS
  {
    id: 62,
    title: 'Beach Access with Palm Tree',
    category: 'Beach & Views',
    image: beachAccessPalmtree,
    description: 'Beach access walkway with palm tree and ocean view.',
    location: 'Beach Access',
    date: 'Beach',
    tags: ['Beach', 'Palm Tree', 'Ocean']
  },
  {
    id: 63,
    title: 'Beachfront Bar',
    category: 'Beach & Views',
    image: beachBarPalmtrees,
    description: 'Beachfront bar area with palm trees and thatched roof.',
    location: 'Beach Bar',
    date: 'Beach',
    tags: ['Beach', 'Bar', 'Palm Trees']
  },
  // NEW ENTRANCE & RECEPTION
  {
    id: 64,
    title: 'Entrance Courtyard at Dusk',
    category: 'Entrance & Reception',
    image: entranceCourtyardDusk,
    description: 'Entrance courtyard area at dusk with palm trees and thatched structures.',
    location: 'Entrance',
    date: 'Courtyard',
    tags: ['Entrance', 'Courtyard', 'Dusk']
  },
  {
    id: 65,
    title: 'Entrance Courtyard with Plants',
    category: 'Entrance & Reception',
    image: entranceCourtyardPlants,
    description: 'Entrance courtyard with green plants and thatched roof pavilion.',
    location: 'Entrance',
    date: 'Courtyard',
    tags: ['Entrance', 'Plants', 'Courtyard']
  },
  {
    id: 66,
    title: 'Barra Cabanas Entrance Gate',
    category: 'Entrance & Reception',
    image: entranceGateSign,
    description: 'Entrance gate with BARRA CABANAS signage and palm tree.',
    location: 'Main Entrance',
    date: 'Entrance',
    tags: ['Entrance', 'Gate', 'Signage']
  },
  {
    id: 67,
    title: 'Tropical Entrance Walkway',
    category: 'Entrance & Reception',
    image: entranceWalkwayTropical,
    description: 'Entrance walkway with tropical landscaping and thatched roof structure.',
    location: 'Entrance',
    date: 'Walkway',
    tags: ['Entrance', 'Tropical', 'Walkway']
  },
  {
    id: 68,
    title: 'Reception Desk Detail',
    category: 'Entrance & Reception',
    image: receptionDeskDetail,
    description: 'Reception desk area with artwork and wooden accents.',
    location: 'Reception',
    date: 'Interior',
    tags: ['Reception', 'Desk', 'Interior']
  },
  {
    id: 69,
    title: 'Reception Lobby',
    category: 'Entrance & Reception',
    image: receptionLobbyInterior,
    description: 'Reception lobby with wooden counter and pendant lighting.',
    location: 'Reception',
    date: 'Lobby',
    tags: ['Reception', 'Lobby', 'Interior']
  },
  {
    id: 70,
    title: 'Reception Signage',
    category: 'Entrance & Reception',
    image: receptionSignExterior,
    description: 'Exterior reception area with RECEPTION signage.',
    location: 'Reception',
    date: 'Exterior',
    tags: ['Reception', 'Signage', 'Exterior']
  },
  // NEW POOLS
  {
    id: 71,
    title: 'Infinity Pool with Ocean View',
    category: 'Pools',
    image: infinityPoolOceanview,
    description: 'Stunning infinity pool with ocean view and palm trees.',
    location: 'Pool Area',
    date: 'Pool',
    tags: ['Pool', 'Infinity', 'Ocean View']
  },
  {
    id: 72,
    title: 'Courtyard Pool with Loungers',
    category: 'Pools',
    image: poolCourtyardLoungers,
    description: 'Courtyard pool area with white loungers and modern architecture.',
    location: 'Courtyard',
    date: 'Pool',
    tags: ['Pool', 'Courtyard', 'Loungers']
  },
  {
    id: 73,
    title: 'Interior Courtyard Pool',
    category: 'Pools',
    image: poolInteriorCourtyard,
    description: 'Interior courtyard pool with white walls and lounge chairs.',
    location: 'Courtyard',
    date: 'Pool',
    tags: ['Pool', 'Interior', 'Courtyard']
  },
  // NEW BALCONIES
  {
    id: 74,
    title: 'Rooftop Dining with Ocean View',
    category: 'Balconies',
    image: rooftopDiningOceanview,
    description: 'Rooftop dining area with ocean view and modern furniture.',
    location: 'Rooftop',
    date: 'Dining',
    tags: ['Rooftop', 'Dining', 'Ocean View']
  },
  // NEW BEDROOMS
  {
    id: 75,
    title: 'Bedroom Suite 12',
    category: 'Bedrooms',
    image: bedroomSuite12,
    description: 'Bedroom with wooden slatted headboard and white bedding.',
    location: 'Bedroom',
    date: 'Suite',
    tags: ['Bedroom', 'Suite', 'Modern']
  },
  {
    id: 76,
    title: 'Bedroom Suite 13',
    category: 'Bedrooms',
    image: bedroomSuite13,
    description: 'Bedroom with wooden headboard and modern minimalist design.',
    location: 'Bedroom',
    date: 'Suite',
    tags: ['Bedroom', 'Suite', 'Minimalist']
  },
  {
    id: 77,
    title: 'Bedroom Suite 14',
    category: 'Bedrooms',
    image: bedroomSuite14,
    description: 'Bedroom with wooden slatted headboard and shelving unit.',
    location: 'Bedroom',
    date: 'Suite',
    tags: ['Bedroom', 'Suite', 'Storage']
  },
  {
    id: 78,
    title: 'Bedroom Suite 15',
    category: 'Bedrooms',
    image: bedroomSuite15,
    description: 'Bedroom with wooden headboard and gray textured bedding.',
    location: 'Bedroom',
    date: 'Suite',
    tags: ['Bedroom', 'Suite', 'Textured']
  },
  {
    id: 79,
    title: 'Bedding Detail',
    category: 'Bedrooms',
    image: beddingDetailWhite,
    description: 'Close-up detail of white bedding and pillows.',
    location: 'Bedroom',
    date: 'Detail',
    tags: ['Bedding', 'Detail', 'White']
  },
  // NEW LIVING SPACES
  {
    id: 80,
    title: 'Lounge Terrace with Ocean View',
    category: 'Living Spaces',
    image: loungeTerraceOceanview,
    description: 'Covered terrace lounge with ocean view and blue sofa.',
    location: 'Terrace',
    date: 'Lounge',
    tags: ['Lounge', 'Terrace', 'Ocean View']
  },
  {
    id: 81,
    title: 'Living Room Lounge',
    category: 'Living Spaces',
    image: livingRoomLounge03,
    description: 'Living room with gray sofa and wooden coffee table.',
    location: 'Living Room',
    date: 'Lounge',
    tags: ['Living Room', 'Sofa', 'Modern']
  },
  {
    id: 82,
    title: 'Open Plan Living & Dining',
    category: 'Living Spaces',
    image: livingDiningOpenplan,
    description: 'Open plan living and dining room with gray sofa.',
    location: 'Living Area',
    date: 'Open Plan',
    tags: ['Living Room', 'Dining', 'Open Plan']
  },
  // NEW KITCHEN & DINING
  {
    id: 83,
    title: 'Dining & Kitchen with Bar Stools',
    category: 'Kitchen & Dining',
    image: diningKitchenBarstool,
    description: 'Dining area and kitchen with bar stools and wooden table.',
    location: 'Kitchen',
    date: 'Dining',
    tags: ['Kitchen', 'Dining', 'Bar Stools']
  },
  {
    id: 84,
    title: 'Rustic Dining & Kitchen',
    category: 'Kitchen & Dining',
    image: diningKitchenRustic,
    description: 'Rustic dining area and kitchen with wooden table.',
    location: 'Kitchen',
    date: 'Dining',
    tags: ['Kitchen', 'Dining', 'Rustic']
  },
  {
    id: 85,
    title: 'Kitchen with Dining Island',
    category: 'Kitchen & Dining',
    image: kitchenDiningIsland,
    description: 'Kitchen and dining area with wooden island and pendant lights.',
    location: 'Kitchen',
    date: 'Island',
    tags: ['Kitchen', 'Island', 'Pendant Lights']
  },
  {
    id: 86,
    title: 'Compact White Kitchenette',
    category: 'Kitchen & Dining',
    image: kitchenetteCompactWhite,
    description: 'Compact white kitchenette with modern fixtures.',
    location: 'Kitchenette',
    date: 'Compact',
    tags: ['Kitchenette', 'Compact', 'White']
  },
  {
    id: 87,
    title: 'Minimal White Kitchenette',
    category: 'Kitchen & Dining',
    image: kitchenetteMinimalWhite,
    description: 'Minimal white kitchenette with sink and cabinets.',
    location: 'Kitchenette',
    date: 'Minimal',
    tags: ['Kitchenette', 'Minimal', 'White']
  },
  // NEW BATHROOMS
  {
    id: 88,
    title: 'Bathroom Vanity 06',
    category: 'Bathrooms',
    image: bathroomVanity06,
    description: 'Bathroom with wooden vanity and glass shower enclosure.',
    location: 'Bathroom',
    date: 'Vanity',
    tags: ['Bathroom', 'Vanity', 'Shower']
  },
  {
    id: 89,
    title: 'Bathroom Vanity 07',
    category: 'Bathrooms',
    image: bathroomVanity07,
    description: 'Bathroom vanity with wooden frame mirror and glass shower.',
    location: 'Bathroom',
    date: 'Vanity',
    tags: ['Bathroom', 'Vanity', 'Mirror']
  },
  {
    id: 90,
    title: 'Bathroom Vanity 08',
    category: 'Bathrooms',
    image: bathroomVanity08,
    description: 'Bathroom with wooden vanity, mirror and glass shower.',
    location: 'Bathroom',
    date: 'Vanity',
    tags: ['Bathroom', 'Vanity', 'Glass']
  },
  {
    id: 91,
    title: 'Bathroom Vanity 09',
    category: 'Bathrooms',
    image: bathroomVanity09,
    description: 'Bathroom vanity with wooden cabinet and glass partition.',
    location: 'Bathroom',
    date: 'Vanity',
    tags: ['Bathroom', 'Vanity', 'Cabinet']
  },
  {
    id: 92,
    title: 'Bathroom Vanity 10',
    category: 'Bathrooms',
    image: bathroomVanity10,
    description: 'Bathroom with wooden vanity and glass shower enclosure.',
    location: 'Bathroom',
    date: 'Vanity',
    tags: ['Bathroom', 'Vanity', 'Enclosure']
  },
  {
    id: 93,
    title: 'Shower & Bathroom Angle',
    category: 'Bathrooms',
    image: showerBathroomAngle,
    description: 'Angled view of bathroom with glass shower and wooden vanity.',
    location: 'Bathroom',
    date: 'Shower',
    tags: ['Bathroom', 'Shower', 'Angle']
  }
];

const categories = [
  'All',
  'Aerial Views',
  'Exterior Views',
  'Beach & Views',
  'Entrance & Reception',
  'Outdoor Spaces',
  'Balconies',
  'Pools',
  'Bedrooms',
  'Living Spaces',
  'Kitchen & Dining',
  'Bathrooms',
  'Interior Details'
];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredGalleryItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const openGalleryDetails = (item) => {
    setSelectedProject(item);
  };

  const closeGalleryDetails = () => {
    setSelectedProject(null);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero">
        <div className="portfolio-hero-overlay"></div>
        <div className="container">
          <h1 className="portfolio-hero-title">Gallery</h1>
          <p className="portfolio-hero-subtitle">
            Step inside paradise — a visual journey through Barra Cabanas
          </p>
        </div>
      </div>

      <section className="gallery-intro">
        <div className="container">
          <p className="gallery-description">
            Explore the beauty, comfort, and unforgettable atmosphere of our luxury beach accommodation. From serene sunrise views to elegant interiors and seaside moments, get inspired for your next escape to Mozambique.
          </p>
        </div>
      </section>

      <section className="portfolio-content">
        <div className="container">
          <div className="portfolio-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="portfolio-grid"
          >
            <AnimatePresence>
              {filteredGalleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className="portfolio-item"
                  onClick={() => openGalleryDetails(item)}
                >
                  <div className="portfolio-image">
                    <img src={item.image} alt={item.title} />
                    <div className="portfolio-overlay">
                      <span className="view-project">View Gallery</span>
                    </div>
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-category">{item.category}</span>
                    <h3 className="portfolio-title">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Gallery Details Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={closeGalleryDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeGalleryDetails}>×</button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-details">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-label">Location:</span>
                  <span className="meta-value">{selectedProject.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Type:</span>
                  <span className="meta-value">{selectedProject.date}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{selectedProject.category}</span>
                </div>
              </div>
              <div className="project-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
