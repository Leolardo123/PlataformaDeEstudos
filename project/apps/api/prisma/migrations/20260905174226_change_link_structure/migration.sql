-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "contentLinkUrls" TEXT[],
ADD COLUMN     "contentPdfUrls" TEXT[],
ADD COLUMN     "contentRichText" TEXT,
ADD COLUMN     "contentVideoUrls" TEXT[];
