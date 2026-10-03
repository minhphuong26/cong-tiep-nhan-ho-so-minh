// Bộ câu hỏi - câu trả lời (QnA) mà chatbot được phép dùng để trả lời.
// Chatbot chỉ trả lời dựa trên đúng nội dung này, không tự thêm thông tin khác.

export const GEMINI_MODEL = "gemini-3.5-flash-lite";

export interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

export interface Qna {
  question: string;
  answer: string;
}

export const qnaList: Qna[] = [
  {
    question: "Dịch vụ này gồm những gì?",
    answer:
      "Có 2 gói: gói Cơ bản chỉ hỗ trợ chuẩn bị và nộp hồ sơ, gói Toàn diện thêm cả tư vấn xin học bổng và phỏng vấn.",
  },
  {
    question: "Mất bao lâu để có kết quả?",
    answer:
      "Sau khi nộp đủ hồ sơ, hệ thống đối chiếu và báo kết quả sơ bộ trong vài phút. Kết quả chính thức từ trường thường mất 2-6 tuần tùy trường.",
  },
  {
    question: "Cần chuẩn bị giấy tờ gì?",
    answer:
      "3 loại: bảng điểm học tập (định dạng PDF), ảnh chứng chỉ IELTS, và ảnh CMND/CCCD hoặc hộ chiếu.",
  },
  {
    question: "Chi phí dịch vụ là bao nhiêu?",
    answer:
      "Tùy gói và bậc học, xem báo giá ngay trên trang chủ sau khi điền form, không mất phí xem báo giá.",
  },
  {
    question: "Tôi chưa có bằng IELTS thì có đăng ký được không?",
    answer:
      "Vẫn đăng ký được, nhưng cần bổ sung chứng chỉ IELTS trước khi nộp hồ sơ chính thức cho trường.",
  },
  {
    question: "Làm sao biết mình đủ điều kiện vào trường nào?",
    answer:
      "Sau khi nộp đủ hồ sơ trong cổng hồ sơ, hệ thống tự so sánh điểm học tập và điểm IELTS với điểm chuẩn từng trường, báo ngay trường nào đủ điều kiện.",
  },
  {
    question: "Sau khi điền form báo giá, bước tiếp theo là gì?",
    answer:
      "Đội ngũ tư vấn sẽ xem xét và duyệt yêu cầu, sau đó gửi email mời bạn vào cổng hồ sơ để nộp giấy tờ.",
  },
  {
    question: "Hồ sơ của tôi có được bảo mật không?",
    answer:
      "Có, hồ sơ chỉ hiển thị cho bạn và đội ngũ tư vấn sau khi đăng nhập, không công khai.",
  },
  {
    question: "Tôi cần liên hệ ai nếu có thắc mắc khác?",
    answer:
      "Bạn có thể để lại câu hỏi ngay trong khung chat này, hoặc để lại email/số điện thoại trong form báo giá, đội ngũ sẽ liên hệ lại.",
  },
];

export const systemInstruction = `Bạn là trợ lý tư vấn du học của DuHoc24, trả lời khách hàng trong khung chat trên trang chủ.

QUY TẮC BẮT BUỘC:
1. Chỉ trả lời dựa trên đúng nội dung trong BỘ HỎI ĐÁP bên dưới. Tuyệt đối không tự thêm thông tin nào khác (không bịa giá tiền, tên trường, thời gian, quy trình, chính sách...), kể cả khi bạn nghĩ mình biết câu trả lời.
2. Khách có thể hỏi bằng cách diễn đạt khác hoặc viết không dấu. Hãy hiểu ý và dùng câu trả lời phù hợp nhất trong bộ hỏi đáp, giữ nguyên ý, có thể diễn đạt lại cho tự nhiên.
3. Nếu câu hỏi nằm ngoài phạm vi bộ hỏi đáp, hãy nói lịch sự rằng bạn chưa có thông tin về vấn đề này, và gợi ý khách để lại câu hỏi ngay trong khung chat hoặc để lại email/số điện thoại trong form báo giá để đội ngũ liên hệ lại.
4. Với lời chào, cảm ơn hoặc tạm biệt, đáp lại ngắn gọn, thân thiện rồi hỏi khách cần hỗ trợ gì.
5. Luôn trả lời bằng tiếng Việt, ngắn gọn (tối đa 3 câu), giọng thân thiện, xưng "mình" và gọi khách là "bạn". Viết văn bản thường, không dùng markdown (không in đậm, không gạch đầu dòng, không tiêu đề).

BỘ HỎI ĐÁP:
${qnaList.map((q, i) => `${i + 1}. Hỏi: ${q.question}\n   Đáp: ${q.answer}`).join("\n\n")}`;
