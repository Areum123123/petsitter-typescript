import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const petSitters = [
  {
    name: "김펫시터",
    experience: "1년",
    certification: "반려견 훈련사 자격증",
    region: "서울",
    image_url: "imageurl",
  },
  {
    name: "강펫시터",
    experience: "1년",
    certification: "반려견 훈련사 자격증",
    region: "서울",
    image_url: "imageurl",
  },
  {
    name: "이펫시터",
    experience: "2년",
    certification: "반려견 훈련사 자격증",
    region: "제주도",
    image_url: "imageurl",
  },
  {
    name: "홍펫시터",
    experience: "2년",
    certification: "반려동물 관리사",
    region: "제주도",
    image_url: "imageurl",
  },
  {
    name: "최펫시터",
    experience: "3년",
    certification: "반려동물 관리사",
    region: "부산",
    image_url: "imageurl",
  },
  {
    name: "유펫시터",
    experience: "3년",
    certification: "반려동물 관리사",
    region: "부산",
    image_url: "imageurl",
  },
];

async function main() {
  for (let petSitter of petSitters) {
    const sitterData = await prisma.petsitters.create({
      data: petSitter,
    });
  }

  console.log("펫시터 데이터 삽입 완료!");
}
// main 함수를 실행
main()
  .catch((e) => {
    console.error(e); // 콘솔에 오류를 출력
    process.exit(1); // 프로세스를 종료
  })
  .finally(async () => {
    await prisma.$disconnect(); // PrismaClient 연결을 종료
  });
