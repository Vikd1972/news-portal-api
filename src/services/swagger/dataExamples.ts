const tokens = {
  authorization: 'AAAA-AAAA-AAAA-AAAA-AAAA-AAAA',
  refresh: 'BBBB-BBBB-BBBB-BBBB-BBBB-BBBB',
};

const user = {
  userId: 1,
  createdAt: '2018-10-01T00:00:00.000Z',
  updatedAt: '2018-10-01T00:00:00.000Z',
  deletedAt: '2018-10-01T00:00:00.000Z',
  lastActivity: '2018-10-01T00:00:00.000Z',
  email: 'some@email.com',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: null,
  status: 'active',
  role: {
    createdAt: '2018-10-01T00:00:00.000Z',
    updatedAt: '2018-10-01T00:00:00.000Z',
    deletedAt: null,
    userRoleId: 3,
    name: 'Admin',
  },
};

const getListMeta = {
  page: 1,
  perPage: 100,
  totalPages: 1,
  totalRecords: 1,
};

export default {
  tokens,
  user,
  getListMeta,
};
