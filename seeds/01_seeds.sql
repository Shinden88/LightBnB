INSERT INTO users (name, email, password)
VALUES ('Carlos Acosta', 'carlosa@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Matija Bozic', 'matijab@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Elena Stojanovksa', 'elenas@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Natalija Davidovic', 'natalijad@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,
number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 'Beach House', 'Warm and Cozy', 'https://media-cdn.tripadvisor.com/media/vr-splice-j/05/e6/d5/b0.jpg',
  'https://media-cdn.tripadvisor.com/media/vr-splice-j/05/e6/d5/b0.jpg', 2000, 1, 1, 2, 'Mexico', 'Awesome Beach', 'Playa Del Carmen', 'Yucatan', 'zxzx', true),
(2, 'Whistler House', 'Freezing and Fun', 'https://media-cdn.tripadvisor.com/media/vr-splice-j/01/d1/f9/69.jpg',
  'https://media-cdn.tripadvisor.com/media/vr-splice-j/01/d1/f9/69.jpg', 2400, 2, 2, 5, 'Canada', 'Hill Side Cres', 'Whistler', 'British Columbia', 'W5H2Z2', true),
  (1, 'Exotic Bungalow', 'Heaven on Earth', 'https://media-cdn.tripadvisor.com/media/vr-splice-j/00/09/0b/0f.jpg',
'https://media-cdn.tripadvisor.com/media/vr-splice-j/00/09/0b/0f.jpg', 3300, 1, 2, 3, 'Bora Bora', 'Sandy Beach', 'Faanui', 'Sea Star', '11ZX33H', true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (2, 3, '2021-09-11', '2021-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(1, 1, '2022-10-01', '2022-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 1, 1, 5, 'message'),
(1, 1, 1, 5, 'message'),
(2, 2, 2, 5, 'message'),
(2, 3, 3, 5, 'message');