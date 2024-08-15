"use client";
import React from "react";
import AvatarsGraph from "./AvatarsGraphs";
import { isMobile, isSafari } from "@/frontend/utils";
import PresenceAnimation from "../../ui/Animations/PresenceAnimation";
import { User } from "@/backend/entities/users/domain/UserDomain";

const BigBDesktop = ({
  users,
  me,
}: {
  users: any[];
  me: User | null | undefined;
}) => {
  const showComponent = !isSafari() && !isMobile();
  return (
    <PresenceAnimation el="div">
      {showComponent && (
        <div className="h-[100vh] w-[100%] lg:h-[90vh]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 624 837"
            fill="none"
          >
            {/* Define la máscara */}
            <mask id="myMask">
              <path
                d="M234.142 0.599329L335.139 18.4078L196.377 805.362L95.3803 787.554L234.142 0.599329Z"
                fill="#fff"
              />
              <path
                d="M408.073 31.2681L509.07 49.0766L370.308 836.031L269.311 818.223L408.073 31.2681Z"
                fill="#fff"
              />
              <path
                d="M195.579 165.639L464.8 213.11L382.127 681.972L112.906 634.501L195.579 165.639Z"
                fill="#000"
              />
              <path
                d="M0.491545 714.319L119.927 36.9642L413.624 88.7508C465.219 97.8485 507.321 112.434 539.931 132.506C572.76 152.618 595.869 176.927 609.258 205.433C622.867 233.978 626.64 265.448 620.574 299.845C616.181 324.761 606.664 346.5 592.024 365.062C577.604 383.662 559.358 398.178 537.284 408.609C515.25 418.819 490.647 424.257 463.475 424.922L462.309 431.537C491.219 437.772 516.376 449.824 537.779 467.693C559.22 485.342 574.898 507.317 584.81 533.619C594.762 559.7 596.919 588.726 591.281 620.698C584.75 657.74 569.236 688.993 544.739 714.457C520.463 739.959 489.117 757.849 450.702 768.126C412.287 778.403 368.494 779.207 319.324 770.537L0.491545 714.319ZM210.276 599.895L296.268 615.058C327.137 620.501 351.3 618.85 368.756 610.106C386.251 601.142 397.001 585.304 401.005 562.593C403.805 546.718 402.538 532.626 397.206 520.319C391.874 508.011 382.988 497.805 370.549 489.7C358.33 481.635 342.85 475.95 324.108 472.645L235.469 457.016L210.276 599.895ZM255.531 343.241L330.94 356.538C347.036 359.376 361.704 359.348 374.946 356.454C388.188 353.56 399.063 347.975 407.57 339.699C416.336 331.241 421.944 320.067 424.393 306.176C428.087 285.229 423.409 267.921 410.359 254.253C397.348 240.364 379.377 231.398 356.446 227.355L278.392 213.592L255.531 343.241Z"
                fill="#fff"
              />
            </mask>

            <g mask="url(#myMask)">
              {/* Botón dentro de los elementos afectados por la máscara */}
              <foreignObject
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/1999/xhtml"
              >
                <AvatarsGraph users={users} isMobile={false} me={me} />
              </foreignObject>
            </g>
          </svg>
        </div>
      )}
    </PresenceAnimation>
  );
};

export default BigBDesktop;
