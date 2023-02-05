import { useTransferContext } from "../../context/TransferContextProvider";
import { button } from "../../nav/classNames/ClassNames";

const MainButton = () => {
  const context = useTransferContext();

  const bbsOpen = () => {
    if (context.contentButton) context.setContentButton(false);
    if (!context.contentButton) context.setBbsButton(true);
    else context.setBbsButton(!context.bbsButton);

    // console.log(context.bbsButton);
  };
  const contentOpen = () => {
    if (context.bbsButton) context.setBbsButton(false);
    if (!context.bbsButton) context.setContentButton(true);
    else context.setContentButton(!context.contentButton);
  };

  return (
    <div className="flex">
      <div className={button} onClick={bbsOpen}>
        커뮤니티
      </div>
      <div className={button} onClick={contentOpen}>
        영상
      </div>
    </div>
  );
};

export default MainButton;
