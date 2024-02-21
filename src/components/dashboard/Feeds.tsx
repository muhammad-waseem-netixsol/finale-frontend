import React, { useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from 'reactstrap';
import useAnalyticsStore from "../../../zustand-store/analytics/analytics";

interface Feed {
  title: string;
  icon: string;
  color: string;
  date: number; // Assuming the date property is a number, you can adjust the type accordingly
  id: number;
}

const Feeds: React.FC = () => {
  const { getAuthorAnalytics, authors } = useAnalyticsStore();

  useEffect(() => {
    getAuthorAnalytics();
  }, []);

  const FeedData: Feed[] = [
    {
      title: "Whitney",
      icon: 'bi bi-person-add',
      color: 'primary',
      date: authors[1]?.WhitneyCounts,
      id: 1,
    },
    {
      title: 'Brianna',
      icon: 'bi bi-people',
      color: 'info',
      date: authors[5]?.BriannaCounts,
      id: 2,
    },
    {
      title: 'Amanda',
      icon: 'bi bi-person-fill',
      color: 'danger',
      date: authors[3]?.AmandaCounts,
      id: 3,
    },
    {
      title: 'Anonymous',
      icon: 'bi bi-person-circle',
      color: 'success',
      date: authors[2]?.AnonymousCounts,
      id: 4,
    },
    {
      title: 'True',
      icon: 'bi bi-person-bounding-box',
      color: 'dark',
      date: authors[4]?.TrueCounts,
      id: 5,
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Authors</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Popular Authors
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed) => (
            <ListGroupItem
              key={feed.id}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button className="rounded-circle me-3" size="sm" color={feed.color}>
                <i className={feed.icon} />
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">{feed.date}</small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
