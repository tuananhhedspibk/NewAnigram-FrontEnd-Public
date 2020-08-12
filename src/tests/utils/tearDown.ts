import {
  closeDBConnection,
  connectToDB,
  dropTestDB,
} from './mongoDBDriver';

module.exports = async () => {
  await connectToDB();
  await dropTestDB();
  await closeDBConnection();
}
