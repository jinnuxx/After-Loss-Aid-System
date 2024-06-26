import SignatureCanvas from "react-signature-canvas";
import useHover from "../hooks/useHover";
import Draggable from "react-draggable";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useRef } from "react";
import CustomButton from "./CustomBtn";
import { errorColor, goodColor, primary45 } from "../utils/colors";

export function DraggableSignature({ url, onEnd, onSet, onCancel }) {
  const styles = {
    container: {
      position: "absolute",
      zIndex: 100000,
      border: `2px solid #1868af`,
      borderRadius: "10px",
    },
    controls: {
      position: "absolute",
      right: 0,
      height: "25px",
      display: "inline-block",
      backgroundColor: "#1868af",
      borderRadius: "0 4px",
    },
    smallButton: {
      display: "inline-block",
      cursor: "pointer",
      padding: 4,
    },
  };
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <div style={styles.smallButton} onClick={onSet}>
            <FaCheck color={goodColor} />
          </div>
          <div style={styles.smallButton} onClick={onCancel}>
            <FaTimes color={errorColor} />
          </div>
        </div>
        <img src={url} width={200} style={styles.img} draggable={false} />
      </div>
    </Draggable>
  );
}

export function AddSigDialog({ onConfirm, onClose, autoDate, setAutoDate }) {
  const sigRef = useRef(null);

  const styles = {
    sigContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
    sigBlock: {
      display: "inline-block",
      border: `1px solid #1868af`,
      borderRadius: 10,
    },
    instructions: {
      display: "flex",
      justifyContent: "space-between",
      textAlign: "center",
      color: "#1868af",
      marginTop: 8,
      width: 600,
      alignSelf: "center",
    },
    instructionsContainer: {
      display: "flex",
      justifyContent: "center",
    },
  };
  return (
    <Dialog
      isVisible={true}
      title={"Add Signature"}
      body={
        <div style={styles.container}>
          <div style={styles.sigContainer}>
            <div style={styles.sigBlock}>
              <SignatureCanvas
                velocityFilterWeight={1}
                ref={sigRef}
                canvasProps={{
                  width: "600",
                  height: 200,
                  className: "sigCanvas",
                }}
              />
            </div>
          </div>
          <div style={styles.instructionsContainer}>
            <div style={styles.instructions}>
              <div>
                Auto date/time{" "}
                <input
                  type={"checkbox"}
                  checked={autoDate}
                  onChange={(e) => setAutoDate(e.target.checked)}
                />
              </div>
              <div>Draw your signature above</div>
            </div>
          </div>

          <ConfirmOrCancel
            onCancel={onClose}
            onConfirm={() => {
              const sigURL = sigRef.current.toDataURL();
              onConfirm(sigURL);
            }}
          />
        </div>
      }
    />
  );
}

export function ConfirmOrCancel({
  onCancel,
  onConfirm,
  confirmTitle = "Confirm",
  leftBlock,
  hideCancel,
  disabled,
}) {
  const styles = {
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
    cancel: {
      marginRight: 8,
    },
  };

  return (
    <div style={styles.actions}>
      <div>{leftBlock}</div>
      <div>
        {!hideCancel ? (
          <CustomButton
            themePalette="secondary"
            onClick={onCancel}
            customWidth="100px"
            marginTop={20}
            disabled={false}
            marginRight={12}
          >
            Cancel
          </CustomButton>
        ) : null}
        <CustomButton
          themePalette="primary"
          onClick={onConfirm}
          customWidth="100px"
          marginTop={20}
          disabled={false}
          marginRight={12}
        >
          Confirm
        </CustomButton>
      </div>
    </div>
  );
}

export function Dialog({
  isVisible,
  body,
  onClose,
  title,
  noPadding,
  backgroundColor,
  positionTop,
  style,
}) {
  if (!isVisible) {
    return null;
  }

  const styles = {
    header: {
      backgroundColor: "#1868af",
      color: "#FFF",
      padding: 8,
      fontSize: 14,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    body: {
      padding: noPadding ? 0 : 14,
      backgroundColor: backgroundColor ? backgroundColor : "#FFF",
    },
    xIcon: {
      cursor: "pointer",
    },
  };

  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      positionTop={positionTop}
      style={style}
    >
      <div style={styles.container}>
        <div style={styles.header}>
          <div>{title}</div>
          <FaTimes
            color={"#FFF"}
            size={16}
            style={styles.xIcon}
            className={"dialogClose"}
            onClick={onClose}
          />
        </div>
        <div style={styles.body}>{body}</div>
      </div>
    </Modal>
  );
}

export function Modal({ onClose, children, isVisible, style }) {
  const styles = {
    container: {
      position: "fixed",
      backgroundColor: "#FFF",
      border: `1px solid #1868af`,
      borderRadius: 10,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      fontFamily: "Open Sans",
      zIndex: 10000,
      boxShadow: "0 0px 14px hsla(0, 0%, 0%, 0.2)",
    },
    background: {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: "#00000033",
      zIndex: 5000,
    },
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div style={styles.outer}>
      <div style={styles.background} onClick={onClose} />
      <div style={{ ...styles.container, ...style }}>{children}</div>
    </div>
  );
}

export function BigButton({
  title,
  onClick,
  inverted,
  fullWidth,
  customFillColor,
  customWhiteColor,
  style,
  noHover,
  id,
  small,
  disabled,
  marginRight,
}) {
  const [hoverRef, isHovered] = useHover();

  let fillColor = customFillColor || primary45;
  const whiteColor = customWhiteColor || "#FFF";

  let initialBg = null;
  let hoverBg = fillColor;

  let initialColor = fillColor;
  let hoverColor = whiteColor;

  if (inverted) {
    initialBg = fillColor;
    hoverBg = null;
    initialColor = whiteColor;
    hoverColor = fillColor;
  }

  if (disabled) {
    initialBg = "#ddd";
    hoverBg = "#ddd";
    fillColor = "#ddd";
  }

  const styles = {
    container: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: fullWidth ? "100%" : null,
      backgroundColor: isHovered && !noHover ? hoverBg : initialBg,
      color:
        isHovered && !noHover && !disabled
          ? hoverColor
          : disabled
            ? "#999"
            : initialColor,
      borderRadius: 4,
      padding: small ? "2px 4px" : "6px 8px",
      fontSize: small ? 14 : null,
      border: `1px solid ${fillColor}`,
      cursor: !disabled ? "pointer" : null,
      userSelect: "none",
      boxSizing: "border-box",
      marginRight,
    },
  };

  return (
    <div
      id={id}
      ref={hoverRef}
      style={{ ...styles.container, ...style }}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      {title}
    </div>
  );
}

export function PagingControl({ totalPages, pageNum, setPageNum }) {
  const styles = {
    container: {
      marginTop: 8,
      marginBottom: 8,
    },
    inlineFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    pageInfo: {
      padding: 8,
      color: "#1868af",
      fontSize: 14,
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.inlineFlex}>
        <CustomButton
          themePalette="secondary"
          onClick={() => setPageNum(pageNum - 1)}
          disabled={pageNum - 1 === -1}
          customWidth="5px"
          // marginRight={12}
        >
          {"<"}
        </CustomButton>
        <div style={styles.pageInfo}>
          Page: {pageNum + 1}/{totalPages}
        </div>
        <CustomButton
          themePalette="secondary"
          onClick={() => setPageNum(pageNum + 1)}
          disabled={pageNum + 1 > totalPages - 1}
          customWidth="5px"
          marginRight={12}
        >
          {">"}
        </CustomButton>
      </div>
    </div>
  );
}
