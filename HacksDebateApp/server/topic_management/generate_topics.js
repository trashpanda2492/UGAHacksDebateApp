import { Topics } from '../../imports/collections/topics';

function generateTopics() {
  const numTopics = Topics.find({}).count();
  if numTopics > 0 {
    return null;
  }
  const politics = {
    title: 'Clinton vs Trump',
    chatrooms: [],
    description: 'Argue for your presidential candidate',
    pro: [],
    con: []
  };
  const gif = {
    title: '.gif vs Jiff',
    chatrooms: [],
    description: 'How is .gif pronounced?',
    pro: [],
    con: []
  };

  const arr = [politics, gif];
  const i = 0;
  while (i < arr.length) {
    Topics.insert(arr[i]);
    i++;
  }
}
