console.log("hello");
let a: number = 5;

interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const draft: Required<Post> = { // ❌
    title: "한입 타스 후기",
    tags: ["ts"],
    content: "",
    // thumbnailURL: "https://...",
  };