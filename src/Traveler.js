class Traveler {
  constructor(travelerInfo) {
    this.id = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
  }

  getTravelerFirstName() {
    const firstName = this.name.split(' ');
    return firstName[0];
  }
}



export default Traveler;
