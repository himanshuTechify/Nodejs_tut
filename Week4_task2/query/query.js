const queries = {
  getUserQuery: `SELECT u.*,f.filename,f.filesize,f.mimetype FROM users AS u LEFT JOIN files AS f 
ON u.id = f."userId" WHERE u.uuid = :userId AND u.is_active = true AND u.is_deleted = false`,
  getAllUserQuery: `SELECT u.*,f.filename,f.filesize,f.mimetype FROM users AS u LEFT JOIN files AS f 
ON u.id = f."userId" WHERE u.is_active = true AND u.is_deleted = false :searchCondition
ORDER BY :sortField :sortOrder LIMIT :limit OFFSET :offset `,
  getUserCount: `SELECT COUNT(*) FROM users AS u WHERE u.is_active = true AND u.is_deleted = false :searchCondition `,
  updateUserPicQuery:  `
  UPDATE files 
  SET filename = :filename, filesize = :filesize, mimetype = :mimetype 
  WHERE "userId" = :userId;
`,
};

module.exports = queries;
