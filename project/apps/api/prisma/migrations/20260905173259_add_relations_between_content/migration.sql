-- CreateTable
CREATE TABLE "NoticeSubject" (
    "noticeId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "NoticeSubject_pkey" PRIMARY KEY ("noticeId","subjectId")
);

-- CreateIndex
CREATE INDEX "NoticeSubject_subjectId_idx" ON "NoticeSubject"("subjectId");

-- AddForeignKey
ALTER TABLE "NoticeSubject" ADD CONSTRAINT "NoticeSubject_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoticeSubject" ADD CONSTRAINT "NoticeSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
