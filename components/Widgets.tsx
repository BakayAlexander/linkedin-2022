import React from 'react';
import { News } from '../typings';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import Image from 'next/image';
import TimeAgo from 'timeago-react';

type WidgetsProps = {
  news: News[];
};

const Widgets: React.FC<WidgetsProps> = ({ news }) => {
  const printedNews = news.length > 0 ? news.slice(0, 5) : [];

  return (
    <div className="hidden xl:inline space-y-2">
      <div className="bg-white dark:bg-[#1d2226] py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none">
        <div className="flex items-center justify-between font-semibold px-2.5">
          <h4>LinkedIn News</h4>
          <InfoRoundedIcon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          {printedNews.map(article => (
            <a href={article.url} key={article.url} target="_blank" rel="noopener noreferrer">
              <div className="flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 py-1">
                <FiberManualRecordRoundedIcon className="!h-2 !w-2" />
                <div>
                  <h5 className="max-w-xs font-medium text-sm truncate pr-10">{article.title}</h5>
                  <TimeAgo
                    datetime={article.publishedAt}
                    className="text-xs mt-0.5 dark:text-white/75 opacity-80"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-[#1D2226] w-11/12 h-64 px-2.5 rounded-lg sticky top-20 border border-gray-300 dark:border-none">
        <div className="relative w-full h-full">
          <Image
            src="https://rb.gy/kbfeaa"
            alt="Ads image"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};
export default Widgets;
