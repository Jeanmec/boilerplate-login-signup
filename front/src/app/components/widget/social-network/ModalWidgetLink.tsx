import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, ReactElement, cloneElement } from "react";
import {
  CreateWidgetSocialLinkSchema,
  createWidgetSocialLinkSchema,
} from "@/validation/widgetSchema";

interface ChildPreview {
  showText?: boolean;
}

interface ModalWidgetLinkProps {
  id: string;
  preview?: ReactElement<ChildPreview>;
}

export default function ModalWidgetLink({ id, preview }: ModalWidgetLinkProps) {
  const [showText, setShowText] = useState(false);

  const { register, handleSubmit } = useForm<CreateWidgetSocialLinkSchema>({
    resolver: zodResolver(createWidgetSocialLinkSchema),
  });

  const onSubmit = (data: CreateWidgetSocialLinkSchema) => {
    console.log(`[${id}] Submitted link:`, data.link);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <p className="text-center">Insert the link of your social network</p>
      <label className="flex flex-col gap-1">
        <span>Link</span>
        <input
          type="text"
          {...register("link")}
          className="input input-bordered"
        />
      </label>
      <label htmlFor={`showText-${id}`} className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`showText-${id}`}
          onChange={(e) => setShowText(e.target.checked)}
        />
        Show text
      </label>

      <div className="flex flex-col gap-4 bg-base-300 text-white py-2 px-4 rounded-xl">
        <div className="text-slate-600 font-bold text-xl">Preview</div>
        <div className="w-fit">
          {preview && cloneElement(preview, { showText })}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
}
