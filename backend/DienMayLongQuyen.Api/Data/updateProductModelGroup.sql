-- BACKUP (run separately if you want)
-- sqlite3 /path/to/longquyen.db ".backup /path/to/longquyen.db.bak"

BEGIN TRANSACTION;

-- 0) Drop old temp tables if exist
DROP TABLE IF EXISTS TempFirstGroups;
DROP TABLE IF EXISTS TempFirstCounts;
DROP TABLE IF EXISTS TempLastGroups;
DROP TABLE IF EXISTS TempFinalGroups;

-- 1) TempFirstGroups: group by first 5 chars (normalized)
CREATE TABLE TempFirstGroups AS
SELECT
    SUBSTR(UPPER(REPLACE(TRIM(Code), '  ', ' ')), 1, 5) AS GroupKeyFirst,
    BrandId,
    CategoryId
FROM Products
WHERE Code IS NOT NULL AND TRIM(Code) <> ''
GROUP BY GroupKeyFirst, BrandId, CategoryId;

-- 1b) counts for first groups
CREATE TABLE TempFirstCounts AS
SELECT
    GroupKeyFirst,
    BrandId,
    CategoryId,
    COUNT(*) AS Cnt
FROM (
    SELECT
        SUBSTR(UPPER(REPLACE(TRIM(Code), '  ', ' ')), 1, 5) AS GroupKeyFirst,
        BrandId,
        CategoryId
    FROM Products
    WHERE Code IS NOT NULL AND TRIM(Code) <> ''
)
GROUP BY GroupKeyFirst, BrandId, CategoryId;

-- 2) For products whose first5-group count = 1, compute last5 grouping
-- create TempLastGroups from those products only
CREATE TABLE TempLastGroups AS
SELECT
    -- compute start position for last 5 chars safely
    CASE 
      WHEN LENGTH(UPPER(REPLACE(TRIM(Code), '  ', ' '))) >= 5
      THEN SUBSTR(UPPER(REPLACE(TRIM(Code), '  ', ' ')), LENGTH(UPPER(REPLACE(TRIM(Code), '  ', ' '))) - 4, 5)
      ELSE SUBSTR(UPPER(REPLACE(TRIM(Code), '  ', ' ')), 1, 5)
    END AS GroupKeyLast,
    BrandId,
    CategoryId
FROM Products p
WHERE Code IS NOT NULL AND TRIM(Code) <> ''
  -- join to first counts to pick only those products whose first5 group count = 1
  AND EXISTS (
    SELECT 1 FROM TempFirstCounts tf
    WHERE tf.GroupKeyFirst = SUBSTR(UPPER(REPLACE(TRIM(p.Code), '  ', ' ')), 1, 5)
      AND ( (tf.BrandId IS NULL AND p.BrandId IS NULL) OR (tf.BrandId = p.BrandId) )
      AND ( (tf.CategoryId IS NULL AND p.CategoryId IS NULL) OR (tf.CategoryId = p.CategoryId) )
      AND tf.Cnt = 1
  )
GROUP BY GroupKeyLast, BrandId, CategoryId;

-- 3) Create final groups:
--    - include all first-groups where count > 1
--    - include all last-groups computed above
CREATE TABLE TempFinalGroups AS
SELECT GroupKeyFirst AS GroupKey, BrandId, CategoryId
FROM TempFirstCounts
WHERE Cnt > 1

UNION

SELECT GroupKeyLast AS GroupKey, BrandId, CategoryId
FROM TempLastGroups;

-- 4) Insert new ProductModelGroups (avoid duplicates)
-- ensure ProductModelGroups.Name is unique enough; use INSERT OR IGNORE
INSERT OR IGNORE INTO ProductModelGroups (Name, BrandId, CategoryId)
SELECT GroupKey, BrandId, CategoryId
FROM TempFinalGroups;

-- 5) Update Products:
-- For each product, try to match by:
--   a) first5-group if that group had Cnt > 1 (i.e. present in TempFinalGroups from first)
--   b) otherwise match by last5-group (present in TempFinalGroups from last)
--
-- We'll update only products where ProductModelGroupId IS NULL or = 0

-- Update by first5 where group existed in final set (i.e. first group had >1)
UPDATE Products
SET ProductModelGroupId = (
    SELECT pmg.Id FROM ProductModelGroups pmg
    WHERE pmg.Name = SUBSTR(UPPER(REPLACE(TRIM(Products.Code), '  ', ' ')), 1, 5)
      AND ( (pmg.BrandId IS NULL AND Products.BrandId IS NULL) OR pmg.BrandId = Products.BrandId )
      AND ( (pmg.CategoryId IS NULL AND Products.CategoryId IS NULL) OR pmg.CategoryId = Products.CategoryId )
    LIMIT 1
)
WHERE (ProductModelGroupId IS NULL OR ProductModelGroupId = 0)
  AND EXISTS (
    SELECT 1 FROM TempFirstCounts tf
    WHERE tf.GroupKeyFirst = SUBSTR(UPPER(REPLACE(TRIM(Products.Code), '  ', ' ')), 1, 5)
      AND ( (tf.BrandId IS NULL AND Products.BrandId IS NULL) OR tf.BrandId = Products.BrandId )
      AND ( (tf.CategoryId IS NULL AND Products.CategoryId IS NULL) OR tf.CategoryId = Products.CategoryId )
      AND tf.Cnt > 1
  );

-- Update remaining products (those not matched by first5 or still null) using last5 grouping when available
UPDATE Products
SET ProductModelGroupId = (
    SELECT pmg.Id FROM ProductModelGroups pmg
    WHERE pmg.Name = CASE 
        WHEN LENGTH(UPPER(REPLACE(TRIM(Products.Code), '  ', ' '))) >= 5
        THEN SUBSTR(UPPER(REPLACE(TRIM(Products.Code), '  ', ' ')), LENGTH(UPPER(REPLACE(TRIM(Products.Code), '  ', ' '))) - 4, 5)
        ELSE SUBSTR(UPPER(REPLACE(TRIM(Products.Code), '  ', ' ')), 1, 5)
    END
    AND ( (pmg.BrandId IS NULL AND Products.BrandId IS NULL) OR pmg.BrandId = Products.BrandId )
    AND ( (pmg.CategoryId IS NULL AND Products.CategoryId IS NULL) OR pmg.CategoryId = Products.CategoryId )
    LIMIT 1
)
WHERE (ProductModelGroupId IS NULL OR ProductModelGroupId = 0)
  AND EXISTS (
    SELECT 1 FROM TempLastGroups tl
    WHERE tl.GroupKeyLast = CASE 
        WHEN LENGTH(UPPER(REPLACE(TRIM(Products.Code), '  ', ' '))) >= 5
        THEN SUBSTR(UPPER(REPLACE(TRIM(Products.Code), '  ', ' ')), LENGTH(UPPER(REPLACE(TRIM(Products.Code), '  ', ' '))) - 4, 5)
        ELSE SUBSTR(UPPER(REPLACE(TRIM(Products.Code), '  ', ' ')), 1, 5)
    END
      AND ( (tl.BrandId IS NULL AND Products.BrandId IS NULL) OR tl.BrandId = Products.BrandId )
      AND ( (tl.CategoryId IS NULL AND Products.CategoryId IS NULL) OR tl.CategoryId = Products.CategoryId )
  );

COMMIT;

-- OPTIONAL: Show summary of what we inserted and updated
-- Number of groups inserted (new)
SELECT COUNT(*) AS TotalProductModelGroups FROM ProductModelGroups;

-- Sample of new groups
SELECT Id, Name, BrandId, CategoryId FROM ProductModelGroups ORDER BY Id DESC LIMIT 50;

-- Sample updated products
SELECT Id, Code, Name, ProductModelGroupId FROM Products WHERE ProductModelGroupId IS NOT NULL ORDER BY Id DESC LIMIT 50;
