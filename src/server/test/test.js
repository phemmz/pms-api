import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {  newLocationDetails, updateLocationDetails } from './__mockData__/Mock';

chai.use(chaiHttp);

describe('App test', () => {
  describe('POST /location', () => {
    it('should create a new location', async () => {
      const response = await chai.request(app)
          .post('/api/v1/location')
          .send(newLocationDetails)
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(201);
      expect(response.body.success).to.equal(true);
      expect(response.body.location).to.exist;
      expect(response.body.message).to.equal('Location created successfully');
      expect(response.body.location.name).to.equal(newLocationDetails.name);
    });

    it('should not create new location if empty/wrong input data is passed', async () => {
      const response = await chai.request(app)
          .post('/api/v1/location')
          .send({ name: '', female: '', male: '' })
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(422);
      expect(response.body.success).to.equal(false);
      expect(response.body.errors).to.exist;
      expect(response.body.errors.name).to.equal('Location name field can not be empty');
      expect(response.body.errors.female).to.equal('Female field can not be empty');
      expect(response.body.errors.male).to.equal('Male field can not be empty');
    });

    it('should return an error if female/male value is not a number', async () => {
      const response = await chai.request(app)
          .post('/api/v1/location')
          .send({ name: 'Abuja', female: 'asas', male: 'asas'})
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(422);
      expect(response.body.success).to.equal(false);
      expect(response.body.errors).to.exist;
      expect(response.body.errors.female).to.equal('Female field value should be a number');
      expect(response.body.errors.male).to.equal('Male field value should be a number');
    });

    it('should be able to nest locations by passing parentLocationId', async () => {
      const response = await chai.request(app)
          .post('/api/v1/location')
          .send({ ...newLocationDetails, parentLocationId: 1 })
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(201);
      expect(response.body.success).to.equal(true);
      expect(response.body.location).to.exist;
      expect(response.body.location.parentLocationId).to.equal(1);
      expect(response.body.message).to.equal('Location created successfully');
    });

    it('should return an error if a wrong/invalid parentLocationId is passed', async () => {
      const response = await chai.request(app)
          .post('/api/v1/location')
          .send({ ...newLocationDetails, parentLocationId: 900909090192911203 })
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(404);
      expect(response.body.success).to.equal(false);
      expect(response.body.location).to.not.exist;
      expect(response.body.message).to.equal('Parent location id not found');
    });
  });

  describe('GET /locations', () => {
    it('should get all locations', async () => {
      const response = await chai.request(app)
          .get('/api/v1/locations')
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.locations).to.exist;
      expect(response.body.message).to.equal('Locations retrieved successfully');
    });
  });

  describe('PUT /locations/:locationId', () => {
    it('should update an existing location details', async () => {
      const response = await chai.request(app)
          .patch(`/api/v1/locations/${1}`)
          .send(updateLocationDetails)
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.updatedLocation).to.exist;
      expect(response.body.message).to.equal('Location updated successfully');
      expect(response.body.updatedLocation.name).to.equal(updateLocationDetails.name);
    });

    it('should not update existing location if empty/wrong input data is passed', async () => {
      const response = await chai.request(app)
          .patch('/api/v1/locations/1')
          .send({ name: '   ', female: '   ', male: '   ' })
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(422);
      expect(response.body.success).to.equal(false);
      expect(response.body.errors).to.exist;
      expect(response.body.errors.name).to.equal('Location name field can not be empty');
      expect(response.body.errors.female).to.equal('Female field value should be a number');
      expect(response.body.errors.male).to.equal('Male field value should be a number');
    });

    it('should not update existing location if updated female/male value is not a number', async () => {
      const response = await chai.request(app)
          .patch('/api/v1/locations/1')
          .send({ name: 'Abuja', female: 'asas', male: 'asas'})
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(422);
      expect(response.body.success).to.equal(false);
      expect(response.body.errors).to.exist;
      expect(response.body.errors.female).to.equal('Female field value should be a number');
      expect(response.body.errors.male).to.equal('Male field value should be a number');
    });

    it('should return an error if a wrong/invalid locationId is passed', async () => {
      const response = await chai.request(app)
          .patch(`/api/v1/locations/${900909}`)
          .send(updateLocationDetails)
          .set('Accept', 'application/json');
          
      expect(response.status).to.equal(404);
      expect(response.body.success).to.equal(false);
      expect(response.body.location).to.not.exist;
      expect(response.body.message).to.equal('Location not found');
    });
  });
});
