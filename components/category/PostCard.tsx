import { PostCardModel } from "@/types/models/postsModel";
import Image from "next/image";
import Tag from "@/components/common/Tag";
import { cn } from "@/lib/utils";

interface PostCardProps {
  className?: string;
  post: PostCardModel;
}

export default function PostCard({ post, className }: PostCardProps) {
  const mainCategoryNames = post.mainCategories.map(
    (category) => category.name
  );
  const platformCategoryNames = post.platformCategories.map(
    (category) => category.name
  );

  const allCategoryNames = [...mainCategoryNames, ...platformCategoryNames];
  const categoryText = allCategoryNames.join("  ·  ");

  const calculateDday = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const dday = calculateDday(post.schedule.recruitmentDeadline);
  const isTodayDeadline = dday === 0;

  const getRewardTagStyle = (rewardType: string): "orange" | "black" => {
    switch (rewardType) {
      case "CASH":
      case "GIFT_CARD":
      case "PRODUCT":
        return "orange";
      case "NONE":
      default:
        return "black";
    }
  };

  return (
    <div
      className={cn(
        "bg-white min-w-[14.625rem] rounded-sm px-3 py-[0.90625rem] flex flex-col gap-2 shadow-[0_0_10px_rgba(14,98,255,0.3)]",
        className
      )}
    >
      <div className="relative rounded-[0.125rem] w-full min-h-[9.125rem] overflow-hidden">
        {post.thumbnailUrl ? (
          <div className="group">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 234px"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-Gray-100" />
        )}
      </div>
      <div className="flex flex-col w-full max-w-[12.625rem]">
        <p className="text-caption-02 font-medium text-Light-Gray">
          {categoryText}
        </p>
        <h3 className="text-body-02 font-semibold text-black line-clamp-2 w-full">
          {post.title}
        </h3>
        <p className="text-caption-02 mt-1 text-Dark-Gray font-medium line-clamp-2 w-full">
          {post.serviceSummary}
        </p>
      </div>
      <div className="flex flex-row gap-1">
        {isTodayDeadline && <Tag style="purple" />}
        {!isTodayDeadline && <Tag style="gray" dday={dday} />}
        <Tag style={getRewardTagStyle(post.reward.rewardDescription)} />
      </div>
    </div>
  );
}
