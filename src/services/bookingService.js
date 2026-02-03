// Booking service for Barra Cabanas website
// Uses hardcoded data - no database integration needed
import { sendBookingEmails } from './emailConfirmationService.js'

/**
 * Hardcoded Barra Cabanas property data
 */
const BARRA_CABANAS_PROPERTY = {
  id: 'barra-cabanas',
  name: 'Barra Cabanas Holiday House',
  price: 700, // Base price per person per night (out of season)
  maxGuests: 12,
  description: 'Luxury beachfront holiday house with 6 en-suite bedrooms (4 queen beds, 2 twin rooms), private splash pool, Samsung 65" Smart TV, Starlink WiFi, air-conditioning throughout, fully equipped modern kitchen with gas stove and airfryer, braai facilities on veranda, daily housekeeping, under-cover parking, and boat launch access. No 4x4 needed.',
  type: 'BEACH_HOUSE',
  bedrooms: 6,
  bathrooms: 6
}

/**
 * Fetch all accommodations - returns hardcoded Barra Cabanas data
 */
export const getAccommodations = async () => {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([BARRA_CABANAS_PROPERTY])
    }, 100)
  })
}

/**
 * Get booked dates - returns empty for now (no booking system integration)
 * In the future, this could be connected to a booking calendar API
 */
export const getBookedDates = async () => {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return empty booked dates - all dates are available
      resolve({
        'barra-cabanas': []
      })
    }, 100)
  })
}

/**
 * Submit a booking - sends email notification only (no database)
 */
export const submitBooking = async (bookingData) => {
  try {
    const customerData = {
      email: bookingData.email,
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      phone: bookingData.phone || '',
      address: bookingData.address || '',
      city: bookingData.city || '',
      country: bookingData.country || 'South Africa',
      postalCode: bookingData.postalCode || '',
    }

    // Generate a simple booking reference
    const bookingReference = `BC-${Date.now()}`

    const booking = {
      id: bookingReference,
      accommodationId: bookingData.accommodationId,
      propertyName: bookingData.propertyName,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      adults: bookingData.guests.adults,
      children: bookingData.guests.children,
      infants: bookingData.guests.infants,
      totalGuests: bookingData.guests.adults + bookingData.guests.children + bookingData.guests.infants,
      totalAmount: bookingData.totalAmount,
      status: 'PENDING',
      source: 'WEBSITE',
      notes: bookingData.specialRequests || '',
      createdAt: new Date().toISOString()
    }

    // Send confirmation emails
    try {
      await sendBookingEmails(bookingData, customerData);
      console.log('✅ Booking emails sent successfully');
    } catch (emailError) {
      console.error('⚠️ Email sending failed:', emailError);
      // Continue even if emails fail
    }

    return {
      success: true,
      booking: booking,
      message: 'Booking request submitted successfully! You will receive a confirmation email shortly at Bookings@barracabanas.com.'
    }
  } catch (error) {
    console.error('Error submitting booking:', error)
    return {
      success: false,
      message: 'Failed to submit booking. Please contact us directly at Bookings@barracabanas.com or call +27 66 205 7229.'
    }
  }
}

/**
 * Subscribe to real-time booking updates - no-op for hardcoded data
 */
export const subscribeToBookingUpdates = (callback) => {
  // Return a mock subscription object
  return {
    unsubscribe: () => {
      console.log('No subscription to unsubscribe from (using hardcoded data)')
    }
  }
}


