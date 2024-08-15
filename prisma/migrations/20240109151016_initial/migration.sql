-- CreateEnum
CREATE TYPE "TOKEN_STATUS" AS ENUM ('VALID', 'INVALID', 'EXPIRED');

-- CreateTable
CREATE TABLE "UrlToken" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "TOKEN_STATUS" NOT NULL DEFAULT 'VALID',
    "userId" INTEGER NOT NULL,
    "takenByUserId" INTEGER,

    CONSTRAINT "UrlToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "image" VARCHAR(255),
    "sid" VARCHAR(255) NOT NULL,
    "sub" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlToken_token_key" ON "UrlToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UrlToken_takenByUserId_key" ON "UrlToken"("takenByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_sid_key" ON "User"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");

-- AddForeignKey
ALTER TABLE "UrlToken" ADD CONSTRAINT "UrlToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UrlToken" ADD CONSTRAINT "UrlToken_takenByUserId_fkey" FOREIGN KEY ("takenByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
